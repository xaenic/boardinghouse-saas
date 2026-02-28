<?php

namespace App\Http\Requests\Api\V1\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterTenantRequest extends FormRequest
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
            'tenant_name' => ['required', 'string', 'max:120'],
            'tenant_slug' => ['required', 'string', 'max:120', 'alpha_dash', 'unique:tenants,slug'],
            'owner_name' => ['required', 'string', 'max:120'],
            'owner_email' => ['required', 'string', 'email', 'max:120'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }
}
