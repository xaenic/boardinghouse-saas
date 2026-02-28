<?php

namespace App\Domain\Auth\Repositories;

use App\Models\User;

interface UserRepositoryInterface
{
    /**
     * @param  array{tenant_id:string,name:string,email:string,password:string}  $attributes
     */
    public function create(array $attributes): User;

    public function findByTenantAndEmail(string $tenantId, string $email): ?User;
}
