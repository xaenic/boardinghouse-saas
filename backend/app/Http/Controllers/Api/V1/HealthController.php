<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Responses\ApiResponse;
use Illuminate\Http\JsonResponse;

class HealthController extends Controller
{
    public function show(): JsonResponse
    {
        return ApiResponse::success([
            'service' => 'boardinghouse-saas-backend',
            'version' => 'v1',
        ], 'Service is healthy');
    }
}
