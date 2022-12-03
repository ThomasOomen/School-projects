<?php

namespace App\Http\Controllers;

use App\Models\Bargain;
use App\Models\Product;
use App\Rules\DateOverlapRule;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BargainController extends Controller
{
    public function bargain_index() {
        $activeBargains = Array();
        $bargains = Bargain::all();
        if(!empty($bargains)){
            foreach($bargains as $bargain){
                if($bargain->endDate > Carbon::now() && $bargain->startDate <= Carbon::now()){
                    $bargain->products;
                    foreach($bargain->products as $product){
                        $product->menuItem;
                    }
                    $bargain->startDate = date('d-m-Y', strtotime($bargain->startDate));
                    $bargain->endDate = date('d-m-Y', strtotime($bargain->endDate));
                    array_push($activeBargains,$bargain);
                }
            }
        }
        return view('bargain_crud/bargain_index', ['activeBargains'=>$activeBargains]);
    }

    public function bargain_create() {
        $products = Product::where('onTheMenu', true)->get();
        return view('bargain_crud/bargain_create', ['products' => $products]);
    }

    public function bargain_store(Request $request) {
        $this->validate($request, [
            'products.*' => 'required|numeric|distinct',
            'prices.*' => 'required|regex:/^\d*(\.\d{2})?$/',
            'startDate' => ['required','date','before:endDate',new DateOverlapRule($request->products,'Start datum', 'after:' . Carbon::now()->subDays(1))],
            'endDate' => ['required','date','after:startDate',new DateOverlapRule($request->products,'Eind Datum')],
        ]);

        $products = $request->products;
        $prices = $request->price;
        $startDate = $request->startDate;
        $endDate = $request->endDate;

        $bargain = new Bargain;
        $bargain->startDate = $startDate;
        $bargain->endDate = $endDate;

        $bargain->save();
        foreach($products as $key => $product){
            $bargain->products()->attach($product,['price'=>$prices[$key]]);
        }

        return redirect(url('/bargain-index'));
    }
}
