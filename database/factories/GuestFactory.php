<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class GuestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'gue_name' => fake()->firstNameMale(),
            'gue_lastName' => fake()->lastName(),
            'gue_identityDocument' => fake()->numberBetween(0, 20),
            'gue_email' => fake()->name(),
            'gue_phoneNumber' => fake()->name(),
            'gue_birthday' => fake()->dateTimeInInterval('-60 year', '-20 year')
        ];
    }
}
