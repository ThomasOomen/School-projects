<?php

namespace App\Http\Controllers;

use App\Models\Bargain;
use App\Models\ProductType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PDF;

class HomeController extends Controller
{
    public function showHomePage() {
        return view('welcome');
    }

    public function showMenuCard() {
        $menuCategories = Array();
        $product_types = ProductType::all();

        foreach ($product_types as $product_type) {
            $category_products = Array();
            foreach ($product_type->products as $product) {
                if ($product->onTheMenu == true) {
                    array_push($category_products, $product);
                    $product->menuItem;
                    $product->productType;

                    $bargains = $product->bargains;
                    if(!empty($bargains)){
                        foreach($bargains as $bargain){
                            if($bargain->endDate > Carbon::now() && $bargain->startDate <= Carbon::now()){
                                $product->price = $bargain->pivot->price;
                            }
                        }
                    }
                }
            }
            $menuCategories[$product_type->name] = $category_products;
        }
        return view('menu_card', ['menuCategories' => $menuCategories]);
    }

    public function makeMenuPDF() {
        $menuCategories = Array();
        $activeBargains = Array();
        $product_types = ProductType::all();

        foreach ($product_types as $product_type) {
            foreach ($product_type->products as $product) {
                $product->menuItem;
                $product->productType;

                $bargains = $product->bargains;
                if(!empty($bargains)){
                    foreach($bargains as $bargain){
                        if($bargain->endDate > Carbon::now() && $bargain->startDate <= Carbon::now()){
                            $product->price = $bargain->pivot->price;
                        }
                    }
                }
            }
            $menuCategories[$product_type->name] = $product_type->products;
        }
        $bargains = Bargain::all();
        if(!empty($bargains)) {
            foreach ($bargains as $bargain) {

                if ($bargain->endDate > Carbon::now() && $bargain->startDate <= Carbon::now()) {
                    $bargain->startDate = date('d-m-Y', strtotime($bargain->startDate));
                    $bargain->endDate = date('d-m-Y', strtotime($bargain->endDate));
                    array_push($activeBargains, $bargain);
                }
            }
        }
        $pdf = PDF::loadview('menu_PDF', compact('menuCategories', 'activeBargains'));
        return $pdf->download('Gouden-draak_menukaart.pdf');
    }

    public function showNews() {
        return view('news');
    }

    public function showContact() {
        return view('contact');
    }
}
