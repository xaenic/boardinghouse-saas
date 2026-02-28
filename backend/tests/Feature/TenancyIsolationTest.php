<?php

namespace Tests\Feature;

use App\Models\Tenant;
use App\Models\User;
use App\Support\Tenancy\TenantContext;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenancyIsolationTest extends TestCase
{
    use RefreshDatabase;

    public function test_tenant_context_is_required_on_protected_route(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/v1/me')
            ->assertStatus(422)
            ->assertJsonPath('success', false);
    }

    public function test_user_query_does_not_leak_across_tenants_when_context_is_set(): void
    {
        $tenantA = Tenant::query()->create(['name' => 'Tenant A', 'slug' => 'tenant-a']);
        $tenantB = Tenant::query()->create(['name' => 'Tenant B', 'slug' => 'tenant-b']);

        User::factory()->create(['tenant_id' => $tenantA->id, 'email' => 'a@example.com']);
        User::factory()->create(['tenant_id' => $tenantB->id, 'email' => 'b@example.com']);

        app(TenantContext::class)->setTenantId($tenantA->id);

        $this->assertSame(1, User::query()->count());
        $this->assertSame('a@example.com', User::query()->firstOrFail()->email);
    }
}
