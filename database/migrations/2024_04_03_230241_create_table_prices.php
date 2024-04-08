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
            $table->float('pri_priceDolar')->nullable();
            $table->integer('pri_unitId');
            $table->timestamp('pri_createdAt')->nullable();
            $table->timestamp('pri_updatedAt')->nullable();
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
