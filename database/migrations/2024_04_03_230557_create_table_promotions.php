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
        Schema::create('promotions', function (Blueprint $table) {
            $table->id('pro_id');
            $table->date('pro_date')->nullable(true);
            $table->smallInteger('pro_units');
            $table->enum('pro_type',['days','people','promotion']);
            $table->float('pro_value');
            $table->timestamp('pro_createdAt')->nullable();
            $table->timestamp('pro_updatedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promotions');
    }
};
