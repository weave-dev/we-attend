<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Modules\Attendance\Models\Attendance;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create()->each(function ($user) {
            $a = Attendance::factory(1000)->for($user)->make([
                'clock_in_time' => now()->subDays(10),
                'clock_out_time' => now()->subDays(5)
            ]);

            Attendance::insert($a->toArray());
        });

        User::factory()->create([
            'name' => 'Mathew Rabasto',
            'email' => 'matty@we.test'
        ]);
    }
}
