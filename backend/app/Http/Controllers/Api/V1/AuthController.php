<?php

namespace App\Http\Controllers\Api\V1;

use App\Application\Auth\Services\LoginService;
use App\Application\Auth\Services\RegisterTenantService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Auth\RegisterTenantRequest;
use App\Http\Responses\ApiResponse;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function registerTenant(RegisterTenantRequest $request, RegisterTenantService $service): JsonResponse
    {
        $user = $service->handle($request->validated());

        Auth::guard('web')->login($user);

        return ApiResponse::success($this->buildUserPayload($user), 'Tenant and owner registered successfully.', null, 201);
    }

    public function login(LoginRequest $request, LoginService $service): JsonResponse
    {
        $user = $service->handle($request->validated());

        Auth::guard('web')->login($user);

        return ApiResponse::success($this->buildUserPayload($user), 'Logged in successfully.');
    }

    public function me(Request $request): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        return ApiResponse::success($this->buildUserPayload($user), 'Authenticated user.');
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();

        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return ApiResponse::success(null, 'Logged out successfully.');
    }

    /**
     * @return array{id:string,tenant_id:string|null,tenant_slug:string|null,name:string,email:string,roles:array<int, string>}
     */
    private function buildUserPayload(User $user): array
    {
        $user->loadMissing('tenant');

        /** @var Tenant|null $tenant */
        $tenant = $user->tenant;

        return [
            'id' => $user->id,
            'tenant_id' => $user->tenant_id,
            'tenant_slug' => $tenant?->slug,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames()->values()->all(),
        ];
    }
}
