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
        Schema::table('counters', function (Blueprint $table) {
            $table->integer('animation_duration')->default(2000); // Animation duration in milliseconds
            $table->integer('animation_delay')->default(0); // Animation delay in milliseconds
            $table->string('animation_easing')->default('easeOutCubic'); // Animation easing function
            $table->string('category')->nullable(); // Counter category for grouping
            $table->text('description')->nullable(); // Optional description
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('counters', function (Blueprint $table) {
            $table->dropColumn([
                'animation_duration',
                'animation_delay',
                'animation_easing',
                'category',
                'description'
            ]);
        });
    }
};
