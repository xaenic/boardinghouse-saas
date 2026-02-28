<?php

namespace App\Application\Auth\Services;

use App\Domain\Auth\Repositories\TenantRepositoryInterface;
use App\Domain\Auth\Repositories\UserRepositoryInterface;
use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Hash;

class LoginService
{
    public function __construct(
        private readonly TenantRepositoryInterface $tenantRepository,
        private readonly UserRepositoryInterface $userRepository,
    ) {}

    /**
     * @param  array{tenant_slug:string,email:string,password:string}  $payload
     */
    public function handle(array $payload): User
    {
        $tenant = $this->tenantRepository->findBySlug($payload['tenant_slug']);

        if ($tenant === null) {
            throw new AuthenticationException('Invalid credentials.');
        }

        $user = $this->userRepository->findByTenantAndEmail($tenant->id, $payload['email']);

        if ($user === null || ! Hash::check($payload['password'], $user->password)) {
            throw new AuthenticationException('Invalid credentials.');
        }

        return $user;
    }
}
