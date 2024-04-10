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
            $table->string('uni_name');
            $table->tinyInteger('uni_availableQuantity');
            $table->tinyInteger('uni_maxPeople');
            $table->tinyInteger('uni_singleBed');
            $table->tinyInteger('uni_dobuleBed');
            $table->tinyInteger('uni_rooms');
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
