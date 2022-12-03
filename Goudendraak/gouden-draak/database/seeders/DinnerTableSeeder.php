<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DinnerTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($index = 1; $index <= 13; $index++) {
            DB::table('dinner_tables')->insert([
                'table_number' => $index,
            ]);
        }
    }
}
