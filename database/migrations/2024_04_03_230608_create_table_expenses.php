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
            $table->integer('exp_uni_id')->nullable();
            $table->enum('exp_type',['cleaning','taxes','repairs'])->default('cleaning');
            $table->float('exp_price')->nullable();
            $table->float('exp_price_dolar')->nullable();
            $table->date('exp_date');
            $table->tinyText('exp_comments')->nullable();
            $table->timestamp('exp_created_at')->nullable();
            $table->timestamp('exp_updated_at')->nullable();
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
