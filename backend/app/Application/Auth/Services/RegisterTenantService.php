<?php

namespace App\Application\Auth\Services;

use App\Domain\Auth\Repositories\TenantRepositoryInterface;
use App\Domain\Auth\Repositories\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class RegisterTenantService
{
    public function __construct(
        private readonly TenantRepositoryInterface $tenantRepository,
        private readonly UserRepositoryInterface $userRepository,
    ) {}

    /**
     * @param  array{tenant_name:string,tenant_slug:string,owner_name:string,owner_email:string,password:string}  $payload
     */
    public function handle(array $payload): User
    {
        return DB::transaction(function () use ($payload): User {
            $ownerRole = Role::findOrCreate('Owner', 'web');
            Role::findOrCreate('Staff', 'web');

            $tenant = $this->tenantRepository->create([
                'name' => $payload['tenant_name'],
                'slug' => $payload['tenant_slug'],
            ]);

            $user = $this->userRepository->create([
                'tenant_id' => $tenant->id,
                'name' => $payload['owner_name'],
                'email' => $payload['owner_email'],
                'password' => Hash::make($payload['password']),
            ]);

            $user->assignRole($ownerRole);

            return $user;
        });
    }
}
