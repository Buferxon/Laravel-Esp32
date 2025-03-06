<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SensorData extends Model
{
    // Especificar el nombre de la tabla
    protected $table = 'sensor_data';



    // Campos que se pueden asignar masivamente

    protected $primaryKey = 'id';
    protected $fillable = ['id', 'temperature', 'humidity', 'air_quality', 'location_id', 'created_at'];





    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
