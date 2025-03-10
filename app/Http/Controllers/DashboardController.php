<?php

namespace App\Http\Controllers;

use App\Models\SensorData;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'sensorData' => $this->getLatestSensorData(),
        ]);
    }

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
            ->take(20)
            ->get()
            ->map(function ($data) {
                return [
                    'id' => $data->id,
                    'temperature' => $data->temperature,
                    'humidity' => $data->humidity,
                    'pressure' => $data->pressure,
                    'location_id' => $data->location_id,
                    'location_name' => $data->location->name,
                    'created_at' => $data->created_at->format('d-m-y H:i'),
                ];
            })->toArray();
    }
}
