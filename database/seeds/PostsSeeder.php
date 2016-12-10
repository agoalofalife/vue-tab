<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        for ( $counter = 0; $counter <= 10; $counter++)
        {
            DB::table('posts')->insert([
                'title'       => $faker->paragraph,
                'description' => $faker->text(),
                'user_id'     =>  DB::table('users')->inRandomOrder()->first()->id,
            ]);
        }
    }
}
