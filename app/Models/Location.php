<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{

    protected $table = "locations";

    protected $primaryKey = 'id';



    protected $fillable = ['name', 'description', 'latitude', 'longitude', 'altitude'];

    public $timestamps = true;

    public function sensorData()
    {
        return $this->hasMany(SensorData::class);
    }
}
