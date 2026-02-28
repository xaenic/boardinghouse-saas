<?php

namespace App\Infrastructure\Persistence\Eloquent;

use App\Domain\Auth\Repositories\UserRepositoryInterface;
use App\Models\User;

class EloquentUserRepository implements UserRepositoryInterface
{
    public function create(array $attributes): User
    {
        return User::query()->create($attributes);
    }

    public function findByTenantAndEmail(string $tenantId, string $email): ?User
    {
        return User::query()
            ->where('tenant_id', $tenantId)
            ->where('email', $email)
            ->first();
    }
}
