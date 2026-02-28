<?php

namespace App\Support\Tenancy;

class TenantContext
{
    private ?string $tenantId = null;

    public function setTenantId(?string $tenantId): void
    {
        $this->tenantId = $tenantId;
    }

    public function tenantId(): ?string
    {
        return $this->tenantId;
    }

    public function hasTenant(): bool
    {
        return $this->tenantId !== null;
    }
}
