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
            'gue_last_name' => fake()->lastName(),
            'gue_identity_document' => fake()->bothify('########'),
            'gue_email' => fake()->email(),
            'gue_phone_number' => fake()->phoneNumber(),
            'gue_birthday' => fake()->dateTimeInInterval('-30 year', '-20 year'),
            'gue_usu_id' => fake()->numberBetween(1, 5)
        ];
    }
}
