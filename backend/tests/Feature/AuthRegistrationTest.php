<?php

namespace Tests\Feature;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AuthRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_tenant_registration_creates_owner_and_roles(): void
    {
        $response = $this->postJson('/api/v1/auth/register-tenant', [
            'tenant_name' => 'Boarding One',
            'tenant_slug' => 'boarding-one',
            'owner_name' => 'Owner One',
            'owner_email' => 'owner@example.com',
            'password' => 'secret123',
            'password_confirmation' => 'secret123',
        ]);

        $response->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.roles.0', 'Owner');

        $this->assertDatabaseHas('tenants', ['slug' => 'boarding-one']);
        $this->assertDatabaseHas('users', ['email' => 'owner@example.com']);
        $this->assertDatabaseHas('roles', ['name' => 'Owner', 'guard_name' => 'web']);
        $this->assertDatabaseHas('roles', ['name' => 'Staff', 'guard_name' => 'web']);
    }

    public function test_login_uses_tenant_slug_and_scopes_duplicate_emails(): void
    {
        $tenantA = Tenant::query()->create(['name' => 'Tenant A', 'slug' => 'tenant-a']);
        $tenantB = Tenant::query()->create(['name' => 'Tenant B', 'slug' => 'tenant-b']);

        Role::findOrCreate('Owner', 'web');

        $userA = User::factory()->create([
            'tenant_id' => $tenantA->id,
            'email' => 'same@example.com',
            'password' => 'secret123',
        ]);
        $userA->assignRole('Owner');

        User::factory()->create([
            'tenant_id' => $tenantB->id,
            'email' => 'same@example.com',
            'password' => 'different123',
        ]);

        $response = $this->postJson('/api/v1/auth/login', [
            'tenant_slug' => 'tenant-a',
            'email' => 'same@example.com',
            'password' => 'secret123',
        ]);

        $response->assertOk()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.tenant_id', $tenantA->id);
    }
}
