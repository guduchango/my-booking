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
        Schema::create('guests', function (Blueprint $table) {
            $table->id('gue_id');
            $table->string('gue_name');
            $table->string('gue_lastName');
            $table->string('gue_identityDocument');
            $table->string('gue_email');
            $table->string('gue_phoneNumber');
            $table->date('gue_birthday');
            $table->timestamp('gue_createdAt')->nullable();
            $table->timestamp('gue_updatedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('guests');
    }
};
