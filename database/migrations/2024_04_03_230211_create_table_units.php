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
        Schema::create('units', function (Blueprint $table) {
            $table->id('uni_id');
            $table->string('uni_name')->nullable();
            $table->tinyInteger('uni_availableQuantity')->nullable();
            $table->tinyInteger('uni_singleBed')->nullable();
            $table->tinyInteger('uni_dobuleBed')->nullable();
            $table->tinyInteger('uni_rooms')->nullable();
            $table->timestamp('uni_createdAt')->nullable();
            $table->timestamp('uni_updatedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
