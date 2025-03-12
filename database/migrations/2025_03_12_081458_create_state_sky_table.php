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
        Schema::create('state_sky', function (Blueprint $table) {
            $table->unsignedInteger('id')->primary();
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();
        });

        Schema::table('sensor_data', function (Blueprint $table) {
            $table->dropColumn('sky_condition');
            $table->unsignedInteger('sky_id')->nullable()->after('pressure');
            $table->foreign('sky_id')->references('id')->on('state_sky')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sensor_data', function (Blueprint $table) {
            $table->dropForeign(['sky_id']);
            $table->dropColumn('sky_id');
            $table->string('sky_condition')->nullable()->after('pressure');
        });

        Schema::dropIfExists('state_sky');
    }
};
