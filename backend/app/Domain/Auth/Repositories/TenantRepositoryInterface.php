<?php

namespace App\Domain\Auth\Repositories;

use App\Models\Tenant;

interface TenantRepositoryInterface
{
    /**
     * @param  array{name:string,slug:string}  $attributes
     */
    public function create(array $attributes): Tenant;

    public function findBySlug(string $slug): ?Tenant;
}
