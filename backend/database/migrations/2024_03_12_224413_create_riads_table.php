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
        Schema::disableForeignKeyConstraints();
        Schema::create('riads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('categorie_id')->nullable()->constrained('categories')->onDelete('cascade');
            $table->string('name');
            $table->string('cover');
            $table->string('localisation');
            $table->text('description');
            $table->integer('prix');
            $table->enum('currency' , ['USD' ,'MAD' , 'EURRO'])->nullable()->default('MAD');
            $table->integer('rooms');
            $table->enum('status' , ['Waiting' ,'Rejected' , 'Approved'])->nullable()->default('Waiting');
            $table->integer('acreage');
            $table->date('checkout');
            $table->date('checkin');
            $table->integer('minnight');
            $table->integer('maxnight');
            $table->integer('guests');
            $table->enum('etat', ['Automatic', 'Manual'])->default('Automatic');
            $table->string('rule');
            $table->foreignId('drriad_id')->nullable()->constrained('dr_riads');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riads');
    }
};
