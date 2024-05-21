<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Query\Expression;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id('res_id');
            $table->date('res_start_date');
            $table->date('res_end_date');
            $table->tinyInteger('res_adults');
            $table->tinyInteger('res_children');
            $table->tinyInteger('res_beds')->default(0);
            $table->tinyInteger('res_nights')->default(0);
            $table->tinyInteger('res_discount_value')->default(0);
            $table->json('res_discount_detail')->default(new Expression('(JSON_ARRAY())'));;
            $table->float('res_price')->nullable();
            $table->float('res_price_dolar')->default(0);
            $table->float('res_price_final')->nullable();
            $table->float('res_advance_payment')->nullable();
            $table->enum('res_status',['pending','approved','finished','canceled'])->default('pending');
            $table->enum('res_channel',['direct','booking','block'])->default('direct');
            $table->tinyText('res_comments')->nullable();
            $table->integer('res_gue_id');
            $table->integer('res_uni_id');
            $table->timestamp('res_created_at')->nullable();
            $table->timestamp('res_updated_at')->nullable();
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
