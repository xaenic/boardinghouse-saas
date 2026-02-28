<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Domain\Auth\Repositories\TenantRepositoryInterface;
use App\Models\Tenant;

class EloquentTenantRepository implements TenantRepositoryInterface
{
    public function create(array $attributes): Tenant
    {
        return Tenant::query()->create($attributes);
    }

    public function findBySlug(string $slug): ?Tenant
    {
        return Tenant::query()->where('slug', $slug)->first();
    }
}
