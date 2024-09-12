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
            $table->tinyInteger('uni_max_people');
            $table->tinyInteger('uni_single_bed');
            $table->tinyInteger('uni_double_bed');
            $table->tinyInteger('uni_rooms');
            $table->integer('uni_usu_id');
            $table->timestamp('uni_created_at')->nullable();
            $table->timestamp('uni_updated_at')->nullable();
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
