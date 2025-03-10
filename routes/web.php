<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Sensor\SensorDataContrller;
use App\Http\Controllers\Sensor\SensorLocationsController;
use App\Http\Controllers\Users\UserController;
use App\Http\Controllers\DashboardController; // Added this line
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





    Route::get('/users', [UserController::class, 'index'])->name('users.index');

    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('api/dashboard/sensor-data', [DashboardController::class, 'getLatestSensorDataApi'])->name('dashboard.sensor-data');
});
Route::get('/sensor/data', [SensorDataContrller::class, 'index'])->name('data.index');







require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
