<?php

namespace Database\Seeders;

use App\Models\Expense;
use App\Models\Unit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExpenseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $units = Unit::select('uni_id')->get()->toArray();

        foreach ($units as $item){

            for($i=0 ; $i<=5 ; $i++){
                $expense = new Expense();
                $expense->exp_uni_id = $item['uni_id'];
                $expense->exp_price = fake()->numberBetween(0, 20);
                $expense->exp_type = fake()->randomElement(['cleaning', 'taxes', 'repairs']);
                $expense->exp_date = fake()->dateTimeBetween('-8 week', '-1 week');
                $expense->exp_comments = fake()->text(100);
                $expense->save();
            }
        }

    }
}
