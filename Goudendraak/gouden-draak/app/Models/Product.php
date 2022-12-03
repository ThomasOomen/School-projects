<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'products';

    public function productType() {
        return $this->belongsTo(ProductType::class,"productType_id");
    }

    public function menuItem(){
        return $this->hasOne(MenuItem::class);
    }

    public function bargains(){
        return $this->belongsToMany(Bargain::class)->withPivot('price');
    }

    public function restaurantSale(){
        return $this->belongsToMany(RestaurantSale::class)->withPivot('amount');
    }

    public function takeawaySale(){
        return $this->belongsToMany(TakeawaySale::class)->withPivot('amount');
    }
}
