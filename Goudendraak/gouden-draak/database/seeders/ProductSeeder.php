<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('products')->insert([
            'name' => 'Soep Ling Fa',
            'price' => 3.80,
            'productType_id' => 1,
        ]);
        DB::table('products')->insert([
            'name' => 'Kippensoep',
            'price' => 2.90,
            'productType_id' => 1,
        ]);
        DB::table('products')->insert([
            'name' => 'Tomatensoep',
            'price' => 2.90,
            'productType_id' => 1,
        ]);
        DB::table('products')->insert([
            'name' => 'Haaienvinnensoep',
            'price' => 3.10,
            'productType_id' => 1,
        ]);
        DB::table('products')->insert([
            'name' => 'Champignonsoep',
            'price' => 3.30,
            'productType_id' => 1
        ]);
        DB::table('products')->insert([
            'name' => 'Pekingsoep',
            'price' => 3.80,
            'productType_id' => 1,
        ]);
        DB::table('products')->insert([
            'name' => 'Wan Tan Soep',
            'price' => 4.30,
            'productType_id' => 1,
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese Champignonsoep',
            'price' => 4.10,
            'productType_id' => 1,
        ]);

        DB::table('products')->insert([
            'name' => 'Loempia Ling Fa',
            'price' => 6.20,
            'productType_id' => 2,
            'description' => 'met atjar,ananas en pindasaus',
        ]);
        DB::table('products')->insert([
            'name' => 'Loempia Compleet',
            'price' => 6.20,
            'productType_id' => 2,
            'description' => 'met gesmoord rundvlees en pikante saus',

        ]);
        DB::table('products')->insert([
            'name' => 'Loempia met kip',
            'price' => 3.90,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Loempia',
            'price' => 3.80,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese mini loempia',
            'price' => 4.90,
            'productType_id' => 2,
            'description' => '4st.',
        ]);
        DB::table('products')->insert([
            'name' => 'Vegetarische mini loempia',
            'price' => 4.90,
            'productType_id' => 2,
            'description' => '12st.',

        ]);
        DB::table('products')->insert([
            'name' => 'Kroepoek',
            'price' => 2.50,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Casave kroepoek',
            'price' => 2.70,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Pangsit Goreng',
            'price' => 3.90,
            'productType_id' => 2,
            'description' =>  '7st.',
        ]);
        DB::table('products')->insert([
            'name' => 'Pisang Goreng',
            'price' => 3.40,
            'productType_id' => 2,
            'description' =>  '5st.',
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese Dim Sum',
            'price' => 5.40,
            'productType_id' => 2,
            'description' => 'mini loempia, kerry ko, pangsit',
        ]);
        DB::table('products')->insert([
            'name' => 'Saté Babi',
            'price' => 5.40,
            'productType_id' => 2,
            'description' => '4st.',
        ]);
        DB::table('products')->insert([
            'name' => 'Saté Ajam',
            'price' => 5.40,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Saté garnalen',
            'price' => 9.90,
            'productType_id' => 2,
            'description' => '3st.',
        ]);
        DB::table('products')->insert([
            'name' => 'Fong Mei Ha',
            'price' => 8.10,
            'productType_id' => 2,
            'description' => 'Krokant gepaneerd garnalen, 4st.',
        ]);
        DB::table('products')->insert([
            'name' => 'Friet',
            'price' => 2.30,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Tsa Siu Mai',
            'price' => 3.50,
            'productType_id' => 2,
            'description' => 'gebakken vleespasteitje, 4st.',
        ]);
        DB::table('products')->insert([
            'name' => 'Atjar',
            'price' => 3.00,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Witte rijst',
            'price' => 3.00,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Grpte pindasaus',
            'price' => 3.90,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Kleine pindasaus',
            'price' => 2.30,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Kippenpootje',
            'price' => 2.30,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Halve kip',
            'price' => 6.00,
            'productType_id' => 2,
        ]);

        DB::table('products')->insert([
            'name' => 'Kroket',
            'price' => 1.40,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Frikandel',
            'price' => 1.40,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Kleine Sambal',
            'price' => 2.50,
            'productType_id' => 2,
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi Goreng Ling Fa',
            'price' => 14.30,
            'productType_id' => 3,
            'description' => 'Fu Yong Hai, Babi Pangang, Saté en kippenpootje',
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi Goreng met ei',
            'price' => 5.00,
            'productType_id' => 3,
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi Goreng speciaal',
            'price' => 8.50,
            'productType_id' => 3,
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi Goreng met saté',
            'price' => 8.50,
            'productType_id' => 3,
            'description' => '3st.',
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi Yeung Chow',
            'price' => 13.00,
            'productType_id' => 3,
            'description' => 'met gaarnaaltjes en Cha Sieuw vlees',
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi Malay',
            'price' => 9.30,
            'productType_id' => 3,
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi met kipfilet',
            'price' => 9.30,
            'productType_id' => 3,
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi met varkensvlees',
            'price' => 9.30,
            'productType_id' => 3,
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi met garnalen',
            'price' => 14.30,
            'productType_id' => 3,
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi met ossenhaas',
            'price' => 15.30,
            'productType_id' => 3,
        ]);
        DB::table('products')->insert([
            'name' => 'Babi Pangang, Foe Yong Hai en Saté',
            'price' => 15.80,
            'productType_id' => 4,
        ]);
        DB::table('products')->insert([
            'name' => 'Babi Pangang, Tjap Tjoy en saté',
            'price' => 15.80,
            'productType_id' => 4,
        ]);
        DB::table('products')->insert([
            'name' => 'Babi Pangang, Koe Loe Yuk en saté',
            'price' => 15.80,
            'productType_id' => 4,
        ]);
        DB::table('products')->insert([
            'name' => 'Babi Pangang, Tau Sie Kai en saté',
            'price' => 16.50,
            'productType_id' => 4,
        ]);
        DB::table('products')->insert([
            'name' => 'Koe Loe Yuk, Foe Yong Hai en saté',
            'price' => 15.80,
            'productType_id' => 4,
        ]);
        DB::table('products')->insert([
            'name' => 'Koe Loe Yuk, Tjap Tjoy en saté',
            'price' => 15.80,
            'productType_id' => 4,
        ]);
        DB::table('products')->insert([
            'name' => 'Foe Yong Hai, Tjap Tjoy en saté',
            'price' => 15.80,
            'productType_id' => 4,
        ]);
        DB::table('products')->insert([
            'name' => 'Foe Yong Hai, Kip Kerrie en saté',
            'price' => 16.80,
            'productType_id' => 4,
        ]);
        DB::table('products')->insert([
            'name' => 'Mihoen Ling Fa',
            'price' => 16.40,
            'productType_id' => 5,
            'description' => 'Foe Yong Hai, Babi Pangang, saté en Kippenpootje',
        ]);
        DB::table('products')->insert([
            'name' => 'Mihoen met varkensvlees',
            'price' => 9.30,
            'productType_id' => 5,
        ]);
        DB::table('products')->insert([
            'name' => 'Mihoen met kipfilet',
            'price' => 10.40,
            'productType_id' => 5,
        ]);
        DB::table('products')->insert([
            'name' => 'Mihoen met ossenhaas',
            'price' => 16.40,
            'productType_id' => 5,
        ]);
        DB::table('products')->insert([
            'name' => 'Mihoen met garnalen',
            'price' => 15.30,
            'productType_id' => 5,
        ]);
        DB::table('products')->insert([
            'name' => 'Mihoen Singapore-style',
            'price' => 11.90,
            'productType_id' => 5,
            'description' => 'met kleine garnaaltjes en Cha Sieuw-vlees en kerrie poeder.',
        ]);
        DB::table('products')->insert([
            'name' => 'Mihoen met Cha Sieuw vlees',
            'price' => 11.20,
            'productType_id' => 5,
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese Bami Ling Fa',
            'price' => 16.90,
            'productType_id' => 6,
            'description' => 'Foe Yong Hai, Babi Pangang, Saté en Kippootje',
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese Bami met varkensvlees',
            'price' => 10.10,
            'productType_id' => 6,
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese Bami met kipfilet',
            'price' => 11.20,
            'productType_id' => 6,
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese Bami met Cha Sieuw-Vlees',
            'price' => 12.20,
            'productType_id' => 6,
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese Bami met garnalen',
            'price' => 15.80,
            'productType_id' => 6,
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese Bami met ossenhaas',
            'price' => 17.40,
            'productType_id' => 6,
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi Rames Ling Fa',
            'price' => 15.30,
            'productType_id' => 7,
            'description' => 'Foe Yong Hai, Babi Pangang, Daging Roedjak, Atjar en kippootje.',
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi Rames',
            'price' => 8.80,
            'productType_id' => 7,
        ]);
        DB::table('products')->insert([
            'name' => 'Bami of Nasi Rames speciaal',
            'price' => 10.80,
            'productType_id' => 7,
        ]);
        DB::table('products')->insert([
            'name' => 'Gado Gado',
            'price' => 7.60,
            'productType_id' => 7,
            'description' => 'met witte rijst',
        ]);
        DB::table('products')->insert([
            'name' => 'Daging Smoor',
            'price' => 13.30,
            'productType_id' => 7,
            'description' => 'met witte rijst',
        ]);
        DB::table('products')->insert([
            'name' => 'Daging Roedjak',
            'price' => 13.30,
            'productType_id' => 7,
            'description' => 'met witte rijst',
        ]);
        DB::table('products')->insert([
            'name' => 'Foe Yong Hai Ling Fa',
            'price' => 16.40,
            'productType_id' => 8,
            'description' => 'Ossenhaas, garnalen en kipfilet',
        ]);
        DB::table('products')->insert([
            'name' => 'Foe Yong Hai met varkensvlees',
            'price' => 8.80,
            'productType_id' => 8,
        ]);
        DB::table('products')->insert([
            'name' => 'Foe Yong Hai met kipfilet',
            'price' => 9.20,
            'productType_id' => 8,
        ]);
        DB::table('products')->insert([
            'name' => 'Foe Yong Hai met garnalen',
            'price' => 15.30,
            'productType_id' => 8,
        ]);
        DB::table('products')->insert([
            'name' => 'Foe Yong Hai met krab',
            'price' => 15.30,
            'productType_id' => 8,
        ]);
        DB::table('products')->insert([
            'name' => 'Foe Yong Hai met Cha-Sieuw Vlees',
            'price' => 11.20,
            'productType_id' => 8,
        ]);
        DB::table('products')->insert([
            'name' => 'Foe Yong Hai met ossenhaas',
            'price' => 16.30,
            'productType_id' => 8,
        ]);
        DB::table('products')->insert([
            'name' => 'Tjap Tjoy Ling Fa',
            'price' => 16.40,
            'productType_id' => 9,
            'description' => 'ossenhaas, garnalen en kipfilet',
        ]);
        DB::table('products')->insert([
            'name' => 'Tjap Tjoy met varkensvlees',
            'price' => 8.80,
            'productType_id' => 9,
        ]);
        DB::table('products')->insert([
            'name' => 'Tjap Tjoy met kipfilet',
            'price' => 9.20,
            'productType_id' => 9,
        ]);
        DB::table('products')->insert([
            'name' => 'Tjap Tjoy met ossenhaas',
            'price' => 16.40,
            'productType_id' => 9,
        ]);
        DB::table('products')->insert([
            'name' => 'Tjap Tjoy met garnalen',
            'price' => 15.30,
            'productType_id' => 9,
        ]);
        DB::table('products')->insert([
            'name' => 'Babi Pangang',
            'price' => 12.20,
            'productType_id' => 10,
        ]);
        DB::table('products')->insert([
            'name' => 'Babi Pangang in ketjapsaus',
            'price' => 12.30,
            'productType_id' => 10,
        ]);
        DB::table('products')->insert([
            'name' => 'Cha Sieuw',
            'price' => '13.30',
            'productType_id' => '10',
            'description' => 'rood geroosterd varkensvlees'
        ]);
        DB::table('products')->insert([
            'name' => 'Cha Sieuw in pikante saus',
            'price' => 13.80,
            'productType_id' => 10,
        ]);
        DB::table('products')->insert([
            'name' => 'Geroosterde Speenvarken',
            'price' => 13.80,
            'productType_id' => 10,
        ]);
        DB::table('products')->insert([
            'name' => 'Koe Loe Yuk',
            'price' => 11.90,
            'productType_id' => 10,
            'description' => 'Bolletjes vlees met zoetzure saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Varkenshaas met kerriesaus',
            'price' => 11.90,
            'productType_id' => 10,
        ]);
        DB::table('products')->insert([
            'name' => 'Varkenshaas met ketjapsaus',
            'price' => 11.90,
            'productType_id' => 10,
        ]);
        DB::table('products')->insert([
            'name' => 'Varkenshaas met tomatensaus',
            'price' => 11.90,
            'productType_id' => 10,
        ]);
        DB::table('products')->insert([
            'name' => 'Varkenshaas met champignons in knoflooksaus',
            'price' => 11.90,
            'productType_id' => 10,
        ]);
        DB::table('products')->insert([
            'name' => 'Varkenshaas met Chinese champignons',
            'price' => 12.20,
            'productType_id' => 10,
        ]);
        DB::table('products')->insert([
            'name' => 'Varkenshaas met zwarte bonensaus',
            'price' => 12.20,
            'productType_id' => 10,
        ]);
        DB::table('products')->insert([
            'name' => 'Varkenshaas met verse ananas in zoetzure saus',
            'price' => 13.30,
            'productType_id' => 10,

        ]);
        DB::table('products')->insert([
            'name' => 'Yu Sian Yuk',
            'price' => 13.30,
            'productType_id' => 10,
            'description' => 'varkenshaas met licht zoet pikante kruiden saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'SzeChuan Yuk',
            'price' => 13.30,
            'productType_id' => 10,
            'description' => 'varkenshaas met pittige kruiden saus.'
        ]);
        DB::table('products')->insert([
            'name' => 'Ajam Pangang',
            'price' => 13.00,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Ajam Pangang in ketjapsaus',
            'price' => 13.00,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Koe Loe Kai',
            'price' => 13.00,
            'productType_id' => 11,
            'description' => 'Bolletjes kip met zoetzure saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Kipfilet met kerriesaus',
            'price' => 13.00,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Kipfilet met champignons in knoflooksaus',
            'price' => 13.00,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Kipfilet met tomatensaus',
            'price' => 13.00,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Kipfilet met ketjapsaus',
            'price' => 13.00,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Kipfilet met broccoli in knoflooksaus',
            'price' => 13.30,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Kipfilet met Chinese champignons',
            'price' => 13.30,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Kipfilet met zwarte bonensaus',
            'price' => 13.30,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Kipfilet met verse ananas in zoetzure saus',
            'price' => 13.30,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Kipfilet met zwarte pepersaus',
            'price' => 13.30,
            'productType_id' => 11,
        ]);
        DB::table('products')->insert([
            'name' => 'Tjieuw Yem Kai',
            'price' => 13.30,
            'productType_id' => 11,
            'description' => 'licht gebrade kipfilet met zout en peper.',
        ]);
        DB::table('products')->insert([
            'name' => 'Yao Koe Kai',
            'price' => 13.30,
            'productType_id' => 11,
            'description' => 'kipfilet met cashewnoten en licht pikante saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Lychee Kai',
            'price' => 13.80,
            'productType_id' => 11,
            'description' => 'licht gebraden kipfilet met lychee in zoetzure saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Yu Sian Kai',
            'price' => 13.30,
            'productType_id' => 11,
            'description' => 'kipfilet met licht zoet pikante kruidensaus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Sze Chuan Kai',
            'price' => 13.80,
            'productType_id' => 11,
            'description' => 'kipfilet met pittige kruidensaus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Kung Bao Kai',
            'price' => 13.80,
            'productType_id' => 11,
            'description' => 'kipfilet met cashewnoten in pittige saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Garnalen met champignons in knoflooksaus',
            'price' => 15.90,
            'productType_id' => 12,
        ]);
        DB::table('products')->insert([
            'name' => 'Garnalen met tomatensaus',
            'price' => 15.90,
            'productType_id' => 12,
        ]);
        DB::table('products')->insert([
            'name' => 'Garnalen met ketjapsaus',
            'price' => 15.90,
            'productType_id' => 12,
        ]);
        DB::table('products')->insert([
            'name' => 'Garnalen met broccoli',
            'price' => 16.10,
            'productType_id' => 12,
        ]);
        DB::table('products')->insert([
            'name' => 'Garnalen met Chinese champignons',
            'price' => 16.10,
            'productType_id' => 12,
        ]);
        DB::table('products')->insert([
            'name' => 'Garnalen met kerriesaus',
            'price' => 16.10,
            'productType_id' => 12,
        ]);
        DB::table('products')->insert([
            'name' => 'Garnalen met zwarte bonensaus',
            'price' => 16.10,
            'productType_id' => 12,
        ]);
        DB::table('products')->insert([
            'name' => 'Garnalen met zwarte pepersaus',
            'price' => 16.10,
            'productType_id' => 12,
        ]);
        DB::table('products')->insert([
            'name' => 'Garnalen met chilisaus',
            'price' => 16.10,
            'productType_id' => 12,
        ]);
        DB::table('products')->insert([
            'name' => 'Yu Sian Haa',
            'price' => 16.10,
            'productType_id' => 12,
            'description' => 'Garnalen met licht zoet pikante kruidensaus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Tjieuw Yem Haa',
            'price' => 16.10,
            'productType_id' => 12,
            'description' => 'Licht gebraden garnalen met zout en peper.',
        ]);
        DB::table('products')->insert([
            'name' => 'Tja Tai Haa',
            'price' => 16.10,
            'productType_id' => 12,
            'description' => 'Krokant gebakken garnalen.',
        ]);
        DB::table('products')->insert([
            'name' => 'Sze Chuan Haa',
            'price' => 16.40,
            'productType_id' => 12,
        ]);
        DB::table('products')->insert([
            'name' => 'Ossenhaas met champignons in knoflooksaus',
            'price' => 16.90,
            'productType_id' => 13,
        ]);
        DB::table('products')->insert([
            'name' => 'Ossenhaas met tomatensaus',
            'price' => 16.90,
            'productType_id' => 13,
        ]);
        DB::table('products')->insert([
            'name' => 'Ossenhaas met ketjapsaus',
            'price' => 16.90,
            'productType_id' => 13,
        ]);
        DB::table('products')->insert([
            'name' => 'Ossenhaas met broccoli',
            'price' => 17.10,
            'productType_id' => 13,
        ]);
        DB::table('products')->insert([
            'name' => 'Ossenhaas met Chinese champignons',
            'price' => 17.10,
            'productType_id' => 13,
        ]);
        DB::table('products')->insert([
            'name' => 'Ossenhaas met kerriesaus',
            'price' => 17.10,
            'productType_id' => 13,
        ]);
        DB::table('products')->insert([
            'name' => 'Ossenhaas met zwarte bonensaus',
            'price' => 17.10,
            'productType_id' => 13,
        ]);
        DB::table('products')->insert([
            'name' => 'Ossenhaas met zwarte pepersaus',
            'price' => 17.10,
            'productType_id' => 13,
        ]);
        DB::table('products')->insert([
            'name' => 'Yu Sian Ngau Yuk',
            'price' => 17.10,
            'productType_id' => 13,
            'description' => 'ossenhaas met pittige kruiden saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Sze Chuang Ngau Yuk',
            'price' => 17.40,
            'productType_id' => 13,
            'description' => 'ossenhaas met pittige kruiden saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Visfilet met kerriesaus',
            'price' => 14.50,
            'productType_id' => 14,
        ]);
        DB::table('products')->insert([
            'name' => 'Visfilet met oestersaus',
            'price' => 14.50,
            'productType_id' => 14,
        ]);
        DB::table('products')->insert([
            'name' => 'Visfilet met zoetzuresaus',
            'price' => 14.50,
            'productType_id' => 14,
            'description' => 'licht gebraden visfilet met verse ananas in zoetzure saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Hong Shau Yu',
            'price' => 14.50,
            'productType_id' => 14,
            'description' => 'licht gebraden visfilet in zoete pikante saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Tjieuw Yem Yu',
            'price' => 15.00,
            'productType_id' => 14,
            'description' => 'licht gebraden visfilet met zout en peper',
        ]);
        DB::table('products')->insert([
            'name' => 'San Sching Po',
            'price' => 16.10,
            'productType_id' => 14,
            'description' => 'visfilet, garnalen, krab en groenten in knoflooksaus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Geroosterde Peking Eend',
            'price' => 16.60,
            'productType_id' => 15,
        ]);
        DB::table('products')->insert([
            'name' => 'Peking Eend met verse ananas in zoetzure saus',
            'price' => 17.10,
            'productType_id' => 15,
        ]);
        DB::table('products')->insert([
            'name' => 'Peking Eend met Chinese champignons in oestersaus',
            'price' => 17.10,
            'productType_id' => 15,
        ]);
        DB::table('products')->insert([
            'name' => 'Yu Sian Ya',
            'price' => 17.10,
            'productType_id' => 15,
            'description' => 'peking eend met licht zoet pikante kruidensaus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Tiepan Ling Fa',
            'price' => 17.90,
            'productType_id' => 16,
            'description' => 'garnalen, kipfilet ossenhaas en groenten in zwarte pepersaus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Tiepan Kai',
            'price' => 15.30,
            'productType_id' => 16,
            'description' => 'licht gebraden kipfilet en groenten met zoet pikante saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Tiepan San Yuk',
            'price' => 17.10,
            'productType_id' => 16,
            'description' => 'licht gebraden varkenshaas kipfilet.',
        ]);
        DB::table('products')->insert([
            'name' => 'Tiepan Haa',
            'price' => 17.40,
            'productType_id' => 16,
            'description' => 'garnalen en groenten met zoet pikante saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Tiepan Ngau Yuk',
            'price' => 19.50,
            'productType_id' => 16,
            'description' => '5st, ossenhaas en groenten met zoet pikante saus.',
        ]);
        DB::table('products')->insert([
            'name' => 'Tau Fu Po',
            'price' => 15.30,
            'productType_id' => 16,
            'description' => 'sojakaas, cha sieuw, garnalen en Chinese paddenstoelen.',
        ]);
        DB::table('products')->insert([
            'name' => 'Vegetarische Tjap Tjoy',
            'price' => 8.30,
            'productType_id' => 17,
        ]);
        DB::table('products')->insert([
            'name' => 'Lo Han Zhai',
            'price' => 11.20,
            'productType_id' => 17,
            'description' => 'sojakaas, Chinese paddenstoelen en groenten in knoflooksaus',
        ]);
        DB::table('products')->insert([
            'name' => 'Vegetarisch Foe Yong Hai',
            'price' => 8.30,
            'productType_id' => 17,
        ]);
        DB::table('products')->insert([
            'name' => 'Frites, saté(2st.) en ei',
            'price' => 6.50,
            'productType_id' => 18,
        ]);
        DB::table('products')->insert([
            'name' => 'Frites, kippootje en ei',
            'price' => 6.50,
            'productType_id' => 18,
        ]);
        DB::table('products')->insert([
            'name' => 'Frites, mini loempia (2st.) en ei',
            'price' => 6.50,
            'productType_id' => 18,
        ]);
        DB::table('products')->insert([
            'name' => 'Kinder Bami of Nasi met saté (2st.) en ei',
            'price' => 6.50,
            'productType_id' => 18,
        ]);
        DB::table('products')->insert([
            'name' => 'Indische rijsttafel (voor 1 persoon)',
            'price' => 16.40,
            'productType_id' => 19,
            'description' => 'Gado Gado, Foe Yong Hai, saté, Daging Roedjak, Daging Smoor, Ajam Ketjap, Atjar, Pisang
            Goreng, Pinda en Cocos.',
        ]);
        DB::table('products')->insert([
            'name' => 'Indische rijsttafel (voor 2 personen',
            'price' => 30.00,
            'productType_id' => 19,
            'description' => 'Ajam Ketjap, Gado Gado, Daging Smoor, Kroepoek, Daging Roedjak, Foe Yong Hai, Saté, Sambal
            Goreng boontjes, Sambal Goreng Kering, Atjar, Pisang Goreng, Pinda en Cocos.'
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese Indische rijsttafel (voor 4 personen)',
            'price' => 66.00,
            'productType_id' => 19,
            'description' => 'Foe Yong Hai, Babi Pangang, Tjap Tjoy, Koe Loe Yuk, Ajam Ketjap, Daging Smoor, Daging
            Roedjak, Saté, Ei, Kroepoek, Sambal Goreng boomtjes, Atjar, Pisang Goreng, Pinda en Cocos.',
        ]);
        DB::table('products')->insert([
            'name' => 'Chinese rijsttafel (voor 2 personen)',
            'price' => 34,
            'productType_id' => 19,
            'description' => 'Kippen-of Tomatensoep. Tjap Tjoy met kipfilet, Koe Loe Yuk, Gebakken garnalen. Babi
            pangang, Foe Yong Hai, saté, Kroepoek.',
        ]);
        DB::table('products')->insert([
            'name' => 'Kantonese rijsttafel (voor 2 personen)',
            'price' => 46.00,
            'productType_id' => 19,
            'description' => 'Wan Tan Soep, Chinese Dim Sum (mini loempia, kerrie ko, pangsit gorenggarnalen, pasteitje)
            , Geroosterd Peking Eend, Lychee kai (licht gebraden kipfilet met lychee in zoetzure saus), Tau Sie Haa
            (garnalen met zwarte bonensaus).',
        ]);
        DB::table('products')->insert([
            'name' => 'Sze Chuan rijsttafel (voor 2 personen)',
            'price' => 46.00,
            'productType_id' => 19,
            'description' => 'Peking Soep (pittie lichtzure soep), Chinese Dim Sum (mini loempia, kerrie ko, pangsit
            goreng, garnalen, pasteitje), Tjieuw Yem Kai (licht gebraden kipfilet met zout en peper), Lychee Yuk ( licht
            gebraden varkensvlees met lychee in zoetzure saus), Yu Sian Ngau Yuk (ossenhaas met licht zoet pikante
            kruiden saus).',
        ]);
    }
}
