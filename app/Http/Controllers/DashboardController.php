<?php

namespace App\Http\Controllers;

use App\Models\SensorData;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Process\Process;


class DashboardController extends Controller
{
    public function index(): Response
    {
        // Obtener datos del sensor
        $sensorData = $this->getLatestSensorData();

        // Ejecutar el script de predicción
        $scriptPath = base_path('storage/app/public/prediccion.py');
        $process = new Process(['python3', $scriptPath]);
        $process->run();

        $datos = [];

        if ($process->isSuccessful()) {
            $output = explode("\n", trim($process->getOutput()));
            foreach ($output as $linea) {
                if (strpos($linea, '=') !== false) {
                    [$clave, $valor] = explode('=', $linea, 2);
                    $datos[$clave] = $valor;
                }
            }
        } else {
            $datos['error'] = 'Error al ejecutar el script de predicción.';
        }

        return Inertia::render('dashboard', [
            'sensorData' => $sensorData,
            'prediccion' => $datos,
            'status' => session('status'),
        ]);
    }


    public function obtenerDatosClima()
    {
        $scriptPath = base_path('storage/app/public/prediccion.py');

        $process = new Process(['python3', $scriptPath]); // Aquí usamos python3 para Linux
        $process->run();

        if (!$process->isSuccessful()) {
            dd($process->getErrorOutput());
        }
        if (!$process->isSuccessful()) {
            return response()->json(['error' => 'Error al ejecutar el script'], 500);
        }

        $output = explode("\n", trim($process->getOutput()));

        $datos = [];

        foreach ($output as $linea) {
            if (strpos($linea, '=') !== false) {
                [$clave, $valor] = explode('=', $linea, 2);
                $datos[$clave] = $valor;
            }
        }
        return Inertia::render('dashboard', [
            'prediccion' => $datos,
            'status' => session('status'),
        ]);

        // return response()->json($datos);
    }


    /**
     * Display the latest sensor data in JSON format.
     *
     * @return JsonResponse
     */
    public function getLatestSensorDataApi(): JsonResponse
    {
        return response()->json([
            'sensorData' => $this->getLatestSensorData()
        ]);
    }

    private function getLatestSensorData(): array
    {
        return SensorData::with('location')
            ->latest()
            ->take(120)
            ->get()
            ->map(function ($data) {
                return [
                    'id' => $data->id,
                    'temperature' => $data->temperature,
                    'humidity' => $data->humidity,
                    'pressure' => $data->pressure,
                    'location_id' => $data->location_id,
                    'location_name' => $data->location->name,
                    'created_at' => $data->created_at->format('d-m-y H:i:s'),
                ];
            })->toArray();
    }
}
