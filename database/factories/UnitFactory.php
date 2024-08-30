<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Unit>
 */
class UnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'uni_name' => fake()->words(3,true),
            'uni_single_bed' => fake()->numberBetween(0, 3),
            'uni_double_bed' => fake()->numberBetween(0, 3),
            'uni_max_people' => fake()->numberBetween(1, 10),
            'uni_rooms' => fake()->numberBetween(0, 3),
        ];
    }
}
