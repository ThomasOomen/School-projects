<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product_types')->insert([
            'name' => 'Soep',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Voorgerechten',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Bami en Nasi gerechten',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Combinatie gerechten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Mihoen gerechten',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Chinese bami gerechten',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Indische gerechten',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Eiergerechten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Groenten gerechten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Vlees gerechten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Kipgerechten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Garnalen gerechten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Ossenhaas gerechten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Vissen gerechten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Peking Eend gerechten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Tiepan specialiteiten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Vegetarische gerechten (met witte reist)',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Kindermenus',
        ]);
        DB::table('product_types')->insert([
            'name' => 'Reisttafels',
        ]);
    }
}
