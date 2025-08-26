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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();

            // relationships
            $table->string('category_id');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');

            $table->unsignedBigInteger('dealer_id')->nullable(); // optional FK for dealers

            // descriptions
            $table->string('short_description');
            $table->text('description');

            // pricing
            $table->decimal('price', 10, 2)->nullable();
            $table->decimal('sale_price', 10, 2)->nullable();

            // media
            $table->json('images')->nullable();
            $table->json('specs');
            $table->json('features')->nullable();
            $table->string('demo_video')->nullable();

            // inventory
            $table->integer('stock_quantity')->default(0);
            $table->integer('low_stock_threshold')->default(0);
            $table->enum('stock_status', ['in-stock', 'out-of-stock', 'on-backorder'])->default('in-stock');
            $table->boolean('track_inventory')->default(true);
            $table->boolean('allow_backorders')->default(false);

            // flags
            $table->boolean('is_new')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
