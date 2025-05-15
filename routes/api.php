<?php

use App\Http\Controllers\Sensor\SensorDataContrller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




Route::post('/sensor/data', [SensorDataContrller::class, 'store'])->name('data.store');
Route::get('/sensor/prediccion', [SensorDataContrller::class, 'obtenerDatosClima'])->name('data.prediccion');

Route::get('/docs/openapi.yaml', function () {
    $filePath = base_path('docs/openapi.yaml');  // Usamos base_path() para acceder a la carpeta 'docs' fuera de 'public'

    if (file_exists($filePath)) {
        $content = file_get_contents($filePath);  // Leemos el contenido del archivo
        return response($content, 200)
            ->header('Content-Type', 'text/plain');  // Usamos 'text/plain' para forzar que se muestre en lugar de descargar
    } else {
        abort(404, 'File not found.');
    }
});
