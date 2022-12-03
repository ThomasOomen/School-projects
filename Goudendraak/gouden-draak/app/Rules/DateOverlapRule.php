<?php

namespace App\Rules;

use App\Models\Product;
use Illuminate\Contracts\Validation\Rule;

class DateOverlapRule implements Rule
{
    public $productIds;
    public $attributename;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($productIds, $attributeName)
    {
        $this->productIds = $productIds;
        $this->attributename=$attributeName;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        foreach($this->productIds as $productId){
            $product = Product::find($productId);
            $bargains = $product->bargains;
            foreach($bargains as $bargain){
                if($bargain->startDate <= $value && $bargain->endDate >= $value){
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->attributename . ' overlapt met een aanbieding die een of meerdere dezelfde producten bevat.';
    }
}
