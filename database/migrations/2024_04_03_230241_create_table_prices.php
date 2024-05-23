<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prices', function (Blueprint $table) {
            $table->id('pri_id');
            $table->date('pri_date');
            $table->float('pri_price');
            $table->float('pri_price_dolar')->nullable();
            $table->integer('pri_uni_id');
            $table->integer('pri_res_id')->nullable();
            $table->timestamp('pri_created_at')->nullable();
            $table->timestamp('pri_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prices');
    }
};
