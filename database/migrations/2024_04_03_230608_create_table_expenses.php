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
        Schema::create('expenses', function (Blueprint $table) {
            $table->id('exp_id');
            $table->integer('exp_uniId')->nullable();
            $table->enum('exp_type',['cleaning','taxes','repairs'])->default('cleaning');
            $table->float('exp_price')->nullable();
            $table->float('exp_priceDolar')->nullable();
            $table->date('exp_date');
            $table->tinyText('exp_comments')->nullable();
            $table->timestamp('exp_createdAt')->nullable();
            $table->timestamp('exp_updatedAt')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
