<?php

use App\Http\Controllers\Sensor\SensorLocationsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/sensor/locations', [SensorLocationsController::class, 'index'])->name('locations.index');
    Route::post('/sensor/locations', [SensorLocationsController::class, 'store'])->name('locations.store');
    Route::get('/sensor/locations/{location}', [SensorLocationsController::class, 'show'])->name('locations.show');
    Route::put('/sensor/locations/{location}', [SensorLocationsController::class, 'update'])->name('locations.update');

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});





require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
