<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;


class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      for ( $counter = 0; $counter <= 10; $counter++)
      {
          DB::table('users')->insert([
              'name' => str_random(10),
              'email' => str_random(10).'@gmail.com',
              'password' => bcrypt('secret'),
          ]);
      }
    }
}
