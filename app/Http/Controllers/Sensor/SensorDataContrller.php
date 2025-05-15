<?php

namespace App\Http\Controllers\Sensor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sensor\StoreDataSensorRequest;
use App\Models\SensorData;
use App\Models\StateSky;
use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\Process\Process;

class SensorDataContrller extends Controller
{
    /**
     * Display a listing of the resource.
     */

    protected  $EstadoResponse;
    public function index(Request $request): Response
    {
        $sensordata = SensorData::with(['location', 'stateSky'])
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->through(function ($data) {
                return [
                    'id' => $data->id,
                    'temperature' => $data->temperature,
                    'humidity' => $data->humidity,
                    'pressure' => $data->pressure,
                    'sky_id' => $data->sky_id,

                    'sky_description' => $data->stateSky?->description,
                    'location_id' => $data->location_id,
                    'location_name' => $data->location->name,
                    'created_at' => $data->created_at->format('d-m-y H:i'),
                ];
            });

        return Inertia::render('sensor/data/Index', [
            'sensordata' => $sensordata,
            'status' => $request->session()->get('status'),
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

        return response()->json($datos);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDataSensorRequest $request)
    {
        $location_id = $request->location_id;

        // Obtener el estado del cielo de la caché o de la API si han pasado 10 minutos
        $sky_id = Cache::remember("sky_id_{$location_id}", 600, function () use ($location_id) {
            return $this->getSkyCondition($location_id);
        });

        if ($sky_id === null) {
            return response()->json(['message' => 'No se pudo obtener el estado del cielo', 'data' => $this->EstadoResponse], 500);
        }

        // Guardar los datos del sensor en la base de datos
        $sensorData = SensorData::create([
            'temperature' => $request->temperature,
            'humidity' => $request->humidity,
            'pressure' => $request->pressure,
            'sky_id' => $sky_id,
            'location_id' => $location_id
        ]);

        return response()->json(['message' => 'Datos guardados correctamente', 'data' => $sensorData], 201);
    }

    private function getSkyCondition($location_id)
    {
        $location = Location::find($location_id);
        if (!$location) {
            return null;
        }

        $lat = $location->latitude;
        $lon = $location->longitude;
        $apiKey = env('OPENWEATHERMAP_API_KEY');
        // dd($apiKey);
        $url = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&lang=es&units=metric&appid={$apiKey}";

        $response = Http::get($url);
        if ($response->failed()) {

            $this->EstadoResponse = $response->json();
            return null;
        }

        $data = $response->json();
        $weatherCode = $data['weather'][0]['id'] ?? null;

        // Buscar el ID correspondiente en la tabla state_sky
        return StateSky::where('id', $weatherCode)->value('id');
    }

    /**
     * Display the specified resource.
     */
    public function show(SensorData $sensorData)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SensorData $sensorData)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SensorData $sensorData)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SensorData $sensorData)
    {
        //
    }
}
