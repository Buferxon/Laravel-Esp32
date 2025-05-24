<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StateSky extends Model
{
    use HasFactory;

    protected $table = 'state_sky';
    protected $fillable = ['name', 'description', 'name_es', 'description_es'];

    public function sensorData()
    {
        return $this->hasMany(SensorData::class, 'sky_id');
    }
}
