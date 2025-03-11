<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SensorData extends Model
{
    use HasFactory, HasUuids; // Usa el trait HasUuids para generar UUIDs automáticamente

    protected $table = 'sensor_data'; // Nombre de la tabla en la base de datos
    protected $primaryKey = 'id'; // Clave primaria
    protected $keyType = 'string'; // Indica que el ID es un string (UUID)
    public $incrementing = false; // Desactiva la auto-incrementación

    protected $fillable = ['temperature', 'humidity', 'pressure', 'sky_condition', 'location_id']; // Campos permitidos para inserción masiva

    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
