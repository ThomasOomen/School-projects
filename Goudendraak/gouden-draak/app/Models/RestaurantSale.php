<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantSale extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'restaurant_sales';

    public function dinnerTable(){
        return $this->belongsTo(DinnerTable::class);
    }

    public function products(){
        return $this->belongsToMany(Product::class)->withPivot('amount');
    }
}
