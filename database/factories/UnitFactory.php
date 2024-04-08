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
            'uni_availableQuantity' => fake()->numberBetween(0, 20),
            'uni_singleBed' => fake()->numberBetween(0, 3),
            'uni_dobuleBed' => fake()->numberBetween(0, 3),
            'uni_rooms' => fake()->numberBetween(0, 3),
        ];
    }
}
