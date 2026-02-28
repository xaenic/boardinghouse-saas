<?php

namespace App\Http\Requests\Api\V1\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'tenant_slug' => ['required', 'string', 'max:120'],
            'email' => ['required', 'string', 'email', 'max:120'],
            'password' => ['required', 'string', 'min:8'],
        ];
    }
}
