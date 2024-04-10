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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id('res_id');
            $table->date('res_startDate');
            $table->date('res_endDate');
            $table->tinyInteger('res_adults');
            $table->tinyInteger('res_children');
            $table->tinyInteger('res_beds')->default(0);
            $table->tinyInteger('res_days');
            $table->tinyInteger('res_discountValue')->default(0);
            $table->json('res_discountDetail');
            $table->float('res_price')->nullable();
            $table->float('res_priceDolar')->default(0);
            $table->float('res_priceFinal')->nullable();
            $table->float('res_advancePayment')->nullable();
            $table->enum('res_status',['pending','approved','finished','canceled'])->default('pending');
            $table->enum('res_channel',['direct','booking','block'])->default('direct');
            $table->tinyText('res_comments')->nullable();
            $table->integer('res_guestId');
            $table->integer('res_unitId');
            $table->timestamp('res_createdAt')->nullable();
            $table->timestamp('res_updatedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
