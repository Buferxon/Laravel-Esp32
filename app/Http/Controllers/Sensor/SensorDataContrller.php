<?php

namespace App\Http\Controllers\Sensor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sensor\StoreDataSensorRequest;
use App\Models\SensorData;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SensorDataContrller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {

        $sensordata = SensorData::paginate(10)->through(function ($data) {
            return [
                'id' => $data->id,
                'temperature' => $data->temperature,
                'humidity' => $data->humidity,
                'pressure' => $data->pressure,
                'sky_condition' => $data->sky_condition,
                'location_id' => $data->location_id,
                'location_name' => $data->location->name,
                'created_at' => $data->created_at->format('d-m-y H:i'),
            ];
        });

        // dd($sensordata);
        return Inertia::render('sensor/data/Index', [
            'sensordata' => $sensordata,
            'status' => $request->session()->get('status'),
        ]);
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
        /**
         * @OA\Post(
         *     path="/sensor/data",
         *     summary="Guardar datos del sensor",
         *     tags={"Sensor Data"},
         *     @OA\RequestBody(
         *         required=true,
         *         @OA\JsonContent(
         *             required={"temperature","humidity","pressure","location_id"},
         *             @OA\Property(property="temperature", type="number", example=25.5),
         *             @OA\Property(property="humidity", type="number", example=60.2),
         *             @OA\Property(property="pressure", type="number", example=1013.25),
         *             @OA\Property(property="sky_condition", type="string", example="Nublado", nullable=true),
         *             @OA\Property(property="location_id", type="integer", example=1)
         *         )
         *     ),
         *     @OA\Response(response=201, description="Datos almacenados correctamente"),
         *     @OA\Response(response=500, description="Error interno del servidor")
         * )
         */
        try {
            // Crear el registro con los datos validados
            $data = SensorData::create($request->validated());

            return response()->json([
                'message' => 'Datos almacenados correctamente',
                'data' => $data
            ], 201); // 201 indica que se creó un nuevo recurso
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'No se pudo almacenar los datos',
                'message' => $e->getMessage()
            ], 500); // 500 indica un error en el servidor
        }
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
