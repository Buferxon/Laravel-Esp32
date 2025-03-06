<?php

namespace App\Http\Requests\Sensor;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLocationRequest extends FormRequest
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
            "name" => ["required", "string", "max:255"],
            "description" => ["nullable", "string", "max:255"],
            "latitude" => ["required", "regex:/^-?\d+(\.\d{2,6})?$/"],
            "longitude" => ["required", "regex:/^-?\d+(\.\d{2,6})?$/"],
            "altitude" => ["nullable", "regex:/^-?\d+(\.\d{2,6})?$/"],
        ];

    }
    public function messages(): array
    {
        return [
            "name.required" => "El nombre es obligatorio.",
            "name.string" => "El nombre debe ser una cadena de texto.",
            "name.max" => "El nombre no puede tener más de 255 caracteres.",
            "description.string" => "La descripción debe ser una cadena de texto.",
            "description.max" => "La descripción no puede tener más de 255 caracteres.",
            "latitude.required" => "La latitud es obligatoria.",
            "latitude.regex" => "La latitud debe ser un número decimal con entre 2 y 6 decimales.",
            "longitude.required" => "La longitud es obligatoria.",
            "longitude.regex" => "La latitud debe ser un número decimal con entre 2 y 6 decimales.",
            "altitude.regex" => "La latitud debe ser un número decimal con entre 2 y 6 decimales.",
        ];
    }
}
