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
        Schema::create('configurations', function (Blueprint $table) {
            $table->id('con_id');
            $table->enum('con_country',['arg','usa','chi','per','bra','col']);
            $table->timestamp('con_created_at');
            $table->timestamp('con_updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('configurations');
    }
};
