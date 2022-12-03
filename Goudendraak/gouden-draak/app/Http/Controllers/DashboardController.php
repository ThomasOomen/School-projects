<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductType;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index() {
        $products = Product::all();

        return view('dashboard', ['products' => $products]);
    }

    public function product_create() {
        $product_types = ProductType::all();

        return view('product_crud/product_create', ['product_types' => $product_types]);
    }

    public function product_store(Request $request) {
        $onTheMenu = $this->get_if_on_menu_from_request($request->on_the_menu);

        $request->validate([
            'name' => 'required',
            'price' => 'required|regex:/^\d+(\.\d{1,2})?$/',
        ]);

        $product = new Product;
        $product->name = $request->name;
        $product->price = $request->price;
        $product->productType_id = $request->product_type;
        $product->description = $request->description;
        $product->onTheMenu = $onTheMenu;

        $product->save();

        return redirect(url('dashboard'));
    }

    public function product_edit($id) {
        $product = Product::where('id', $id)->first();
        $product_types = ProductType::all();

        return view('product_crud/product_edit', ['product' => $product, 'product_types' => $product_types]);
    }

    public function product_update(Request $request) {
        $onTheMenu = $this->get_if_on_menu_from_request($request->on_the_menu);

        $request->validate([
            'name' => 'required',
            'price' => 'required|regex:/^\d+(\.\d{1,2})?$/',
        ]);

        $product = Product::find($request->id);
        $product->name = $request->name;
        $product->price = $request->price;
        $product->productType_id = $request->product_type;
        $product->description = $request->description;
        $product->onTheMenu = $onTheMenu;

        $product->save();

        return redirect(url('dashboard'));
    }

    public function product_destroy($id) {
        Product::destroy($id);
        return redirect(url('dashboard'));
    }

    private function get_if_on_menu_from_request($string) {
        if ($string === 'on') {
            return true;
        } else {
            return false;
        }
    }
}
