<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gouden-draak.com',
            'password' => Hash::make('password'),
            'role_id' => 1,
        ]);
        DB::table('users')->insert([
            'name' => 'kassa',
            'email' => 'kassa@gouden-draak.com',
            'password' => Hash::make('password'),
            'role_id' => 2,
        ]);
    }
}
