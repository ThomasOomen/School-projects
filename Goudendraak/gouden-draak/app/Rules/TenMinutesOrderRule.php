<?php

namespace App\Rules;

use App\Models\DinnerTable;
use Illuminate\Contracts\Validation\Rule;

class TenMinutesOrderRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
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
        $table = DinnerTable::find($value);
        $sales = $table->restaurantSales;
        foreach($sales as $sale){

            if(strtotime($sale->created_at) > strtotime("-10 minutes")){
                return false;
            }
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Deze tafel heeft de afgelopen 10 minuten nog een bestelling geplaatst.';
    }
}
