<?php

namespace App\Http\Controllers\Sensor;

use App\Http\Controllers\Controller;
use App\Http\Requests\Sensor\StoreLocationRequest;
use App\Http\Requests\Sensor\UpdateLocationRequest;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
class SensorLocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {

        $locations = Location::all()->map(function ($location) {
            return [
                'id' => $location->id,
                'name' => $location->name,
                'description' => $location->description,
                'latitude' => $location->latitude,
                'longitude' => $location->longitude,
                'altitude' => $location->altitude,
                'created_at' => $location->created_at->format('d-m-Y'),
                'updated_at' => $location->updated_at ? ($location->updated_at->eq($location->created_at) ? 'Sin cambios' : $location->updated_at->diffForHumans()) : 'Sin cambios',
            ];
        });
        return Inertia::render('sensor/locations/Index', [
            'locations' => $locations,
            'status' => $request->session()->get('status'),
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationRequest $request)
    {

        // dd($request->all());
        $location = Location::create($request->validated());

        return to_route('locations.index')->with('status', 'Ubicación creada.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location): Response
    {
        return Inertia::render('sensor/Show', [
            'location' => [
                'id' => $location->id,
                'name' => $location->name,
                'description' => $location->description,
                'latitude' => $location->latitude,
                'longitude' => $location->longitude,
                'altitude' => $location->altitude,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, Location $location)
    {
        $loca = $request->validated();
        $location->update($loca);
        return to_route('locations.index')->with('status', 'Ubicación actualizada.');


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        //
    }
}
