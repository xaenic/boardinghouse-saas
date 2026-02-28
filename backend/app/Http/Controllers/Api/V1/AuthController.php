<?php

namespace App\Http\Controllers\Api\V1;

use App\Application\Auth\Services\LoginService;
use App\Application\Auth\Services\RegisterTenantService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Auth\LoginRequest;
use App\Http\Requests\Api\V1\Auth\RegisterTenantRequest;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function registerTenant(RegisterTenantRequest $request, RegisterTenantService $service): JsonResponse
    {
        $user = $service->handle($request->validated());

        Auth::guard('web')->login($user);

        return ApiResponse::success([
            'id' => $user->id,
            'tenant_id' => $user->tenant_id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames()->values(),
        ], 'Tenant and owner registered successfully.', null, 201);
    }

    public function login(LoginRequest $request, LoginService $service): JsonResponse
    {
        $user = $service->handle($request->validated());

        Auth::guard('web')->login($user);

        return ApiResponse::success([
            'id' => $user->id,
            'tenant_id' => $user->tenant_id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames()->values(),
        ], 'Logged in successfully.');
    }

    public function me(Request $request): JsonResponse
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        return ApiResponse::success([
            'id' => $user->id,
            'tenant_id' => $user->tenant_id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $user->getRoleNames()->values(),
        ], 'Authenticated user.');
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
}
