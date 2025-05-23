<?php

namespace App\Http\Requests\Sensor;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

use Illuminate\Validation\ValidationException;

class StoreDataSensorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'temperature' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'humidity' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'pressure' => 'required|numeric|regex:/^\d+(\.\d{1,2})?$/',
            'sky_id' => 'nullable|exists:state_sky,id',
            'location_id' => 'required|exists:locations,id',
        ];
    }


    public function messages()
    {
        return [
            'temperature.required' => 'La temperatura es obligatoria',
            'temperature.numeric' => 'La temperatura debe ser un número',
            'temperature.regex' => 'La temperatura debe ser un número con 2 decimales',
            'humidity.required' => 'La humedad es obligatoria',
            'humidity.numeric' => 'La humedad debe ser un número',
            'humidity.regex' => 'La humedad debe ser un número con 2 decimales',
            'pressure.required' => 'La presión es obligatoria',
            'pressure.numeric' => 'La presión debe ser un número',
            'pressure.regex' => 'La presión debe ser un número con 2 decimales',
            'sky_id.exists' => 'El estado del cielo seleccionado no existe',
            'location_id.required' => 'La ubicación es obligatoria',
            'location_id.exists' => 'La ubicación no existe',
        ];
    }

    /**
     * Personaliza la respuesta en caso de fallar la validación.
     */
    protected function failedValidation(Validator $validator)
    {
       
            // Para API: devuelve JSON
            throw new HttpResponseException(response()->json([
                'messages' => 'Los datos proporcionados no son válidos',
                'errors' => $validator->errors()
            ], 422));
        
       
    }

    /**
     * Detecta si la solicitud es JSON o API.
     */
    
}
