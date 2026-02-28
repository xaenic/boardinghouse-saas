<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\HealthController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/health', [HealthController::class, 'show']);

    Route::prefix('/auth')->group(function (): void {
        Route::post('/register-tenant', [AuthController::class, 'registerTenant']);
        Route::post('/login', [AuthController::class, 'login']);

        Route::middleware(['auth:sanctum', 'tenant'])->group(function (): void {
            Route::get('/me', [AuthController::class, 'me']);
            Route::post('/logout', [AuthController::class, 'logout']);
        });
    });

    Route::middleware(['auth:sanctum', 'tenant'])->get('/me', [AuthController::class, 'me']);
});
