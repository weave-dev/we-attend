<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\Attendance\Models\Attendance;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Modules\Attendance\Models\Attendance>
 */
class AttendanceFactory extends Factory
{
    protected $model = Attendance::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'clock_in_time' => now(),
            'clock_out_time' => null,
            'attendee' => $this->faker->randomElement(['123456', '654321', '112233', '445566']),
        ];
    }
}
