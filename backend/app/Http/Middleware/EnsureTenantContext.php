<?php

namespace App\Http\Middleware;

use App\Support\Tenancy\TenantContext;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureTenantContext
{
    public function handle(Request $request, Closure $next): Response
    {
        $tenantId = $request->header('X-Tenant-Id');

        if ($tenantId === null && $request->user() !== null) {
            $tenantId = $request->user()->tenant_id;
        }

        if ($tenantId === null) {
            return response()->json([
                'success' => false,
                'message' => 'Tenant context is required.',
                'data' => null,
                'meta' => null,
            ], 422);
        }

        app(TenantContext::class)->setTenantId($tenantId);

        return $next($request);
    }
}
