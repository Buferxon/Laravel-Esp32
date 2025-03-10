<?php

namespace App\Http\Requests\User;

use App\Models\User;

use Illuminate\Validation\Rules;
use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
    protected function prepareForValidation()
    {
        $this->merge([
            'identification_number' => is_numeric($this->identification_number) ? (int) $this->identification_number : $this->identification_number,
        ]);
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'identification_number' => 'required|numeric|digits_between:7,10',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El nombre es obligatorio',
            'email.required' => 'El correo electrónico es obligatorio',
            'password.required' => 'La contraseña es obligatoria',
            'password.confirmed' => 'Las contraseñas no coinciden',
            'identification_number.required' => 'El número de identificación es obligatorio',
            'identification_number.numeric' => 'El número de identificación debe ser numérico',
            'identification_number.digits_between' => 'El número de identificación debe tener entre 7 y 10 dígitos',
        ];
    }
}
