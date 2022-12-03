<?php

namespace App\Http\Controllers;

use App\Models\DinnerTable;
use App\Models\Product;
use App\Models\RestaurantSale;
use App\Models\TakeawaySale;
use App\Rules\TenMinutesOrderRule;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;

class OrderController extends Controller
{
    public function order_index() {
        $sales = RestaurantSale::all();
        foreach($sales as $sale){
            $sale->dinnerTable;

            foreach($sale->products as $product){
                $product->menuitem;
                $product->pivot->amount;
            }
        }

        return view('order_crud/order_index', ['sales' => $sales]);
    }

    public function order_create() {
        $products = Product::where('onTheMenu', true)->get();
        foreach($products as $product){
            $bargains = $product->bargains;
            if(!empty($bargains)){
                foreach($bargains as $bargain){
                    if($bargain->endDate > Carbon::now() && $bargain->startDate <= Carbon::now()){
                        $product->price = $bargain->pivot->price;
                    }
                }
            }
        }
        $tables = DinnerTable::all()->pluck('table_number');
        return view('order_crud/order_create', ['products' => $products, 'tables' => $tables]);
    }

    public function order_store(Request $request) {
        $this->validate($request, [
            'products.*' => 'required|numeric|distinct',
            'quantity.*' => 'required|numeric|',
            'tableNumber' => ['required','numeric',new TenMinutesOrderRule()],
        ]);

        $sale = new RestaurantSale;
        $sale->saleDate = Carbon::now();
        $sale->dinner_table_id = $request->tableNumber;

        $products = $request->products;
        $quantities = $request->quantity;

        $totalprice = 0;
        foreach($products as $key => $product){
            $productObject = Product::find($product);
            $bargains = $productObject->bargains;
            foreach($bargains as $bargain){
                if($bargain->startDate < Carbon::now() && $bargain->endDate > Carbon::now()){
                    $productObject->price = $bargain->pivot->price;
                }
            }

            $totalprice = $totalprice + ($productObject->price * $quantities[$key]);
            $sale->price = $totalprice;
            $sale->save();

            $sale->products()->attach($product,['amount'=>$quantities[$key]]);
        }
        return redirect(url('/'));
    }

    public function order_repeat() {
        $tables = DinnerTable::all();

        return view('order_crud/order_repeat', ['tables' => $tables]);
    }

    public function order_repeat_step_2($id) {
        $sales = RestaurantSale::where('dinner_table_id', $id)->get();
        $todaySales = Array();
        foreach($sales as $sale){
            $date = new Date($sale->saleDate);
            if($date != Carbon::now()->format('Ymd')){
                array_push($todaySales,$sale);
            }
        }
        return view('order_crud/order_repeat_2', ['sales' => $todaySales]);
    }

    public function order_repeat_store(Request $request) {
        $this->validate($request, [
            'tableId' => ['required','numeric',new TenMinutesOrderRule()],
            'saleId' => ['required','numeric']
        ]);

        $saleId = $request->saleId;
        $tableId = $request->tableId;

        $copySale = RestaurantSale::find($saleId);
        $newSale = new RestaurantSale;

        $newSale->saleDate = Carbon::now();
        $newSale->dinner_table_id = $tableId;
        $newSale->price = $copySale->price;
        $newSale->save();

        foreach($copySale->products as $product){
            $newSale->products()->attach($product, ['amount'=>$product->pivot->amount]);
        }

        return redirect(url('/'));
    }

    public function order_takeaway_create() {
        $products = Product::where('onTheMenu', true)->get();
        foreach($products as $product){
            $bargains = $product->bargains;
            if(!empty($bargains)){
                foreach($bargains as $bargain){
                    if($bargain->endDate > Carbon::now() && $bargain->startDate <= Carbon::now()){
                        $product->price = $bargain->pivot->price;
                    }
                }
            }
        }
        return view('order_crud/order_takeaway_create', ['products' => $products]);
    }

    public function order_takeaway_store(Request $request) {
        $this->validate($request, [
            'products.*' => 'required|numeric|distinct',
            'quantity.*' => 'required|numeric|',
            'name'=> 'required|max:255|min:2|'
        ]);

        $sale = new TakeawaySale;
        $sale->saleDate = Carbon::now();
        $sale->name = $request->name;


        $products = $request->products;
        $quantities = $request->quantity;

        $totalprice = 0;
        foreach($products as $key => $product){
            $productObject = Product::find($product);
            $bargains = $productObject->bargains;
            foreach($bargains as $bargain){
                if($bargain->startDate < Carbon::now() && $bargain->endDate > Carbon::now()){
                    $productObject->price = $bargain->pivot->price;
                }
            }


            $totalprice = $totalprice + ($productObject->price * $quantities[$key]);
            $sale->price = $totalprice;
            $sale->save();

            $sale->products()->attach($product,['amount'=>$quantities[$key]]);
        }

        $qrStringName = "Naam: ".$sale->name."\n\r";
        $qrStringProducts = "Gerechten:  \n\r";
        foreach($sale->products as $product){
            $qrStringProducts = $qrStringProducts . $product->menuItem->menuNumber . $product->menuItem->menuNumberAddon . " " . $product->name . " x" . $product->pivot->amount . "\n";
        }
        $qrStringProducts = $qrStringProducts . "\r";
        $qrStringOrderNumber = "Bestelnummer: " . $sale->id;

        $qrString = $qrStringName . $qrStringProducts . $qrStringOrderNumber;
        $encodedQrString = urlencode($qrString);
        $url = "https://api.qrserver.com/v1/create-qr-code/?data=" . $encodedQrString . "&size=500x500";

        return view('order_crud/thank_for_takeaway', ['url' => $url]);
    }
}
