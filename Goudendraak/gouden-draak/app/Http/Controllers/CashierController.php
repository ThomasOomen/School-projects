<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CashierController extends Controller
{
    public function cashierMenu_index() {
        $products = Product::with('productType')->where('onTheMenu', true )->get();
        foreach($products as $product){
            $product->menuItem;
        }
        return view('cashier/menu')->with(['products'=>$products]);
    }
}
