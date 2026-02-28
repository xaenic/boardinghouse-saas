<?php

namespace App\Providers;

use App\Domain\Auth\Repositories\TenantRepositoryInterface;
use App\Domain\Auth\Repositories\UserRepositoryInterface;
use App\Infrastructure\Persistence\Eloquent\EloquentTenantRepository;
use App\Infrastructure\Persistence\Eloquent\EloquentUserRepository;
use App\Models\Tenant;
use App\Models\User;
use App\Support\Tenancy\TenantContext;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(TenantContext::class, static fn (): TenantContext => new TenantContext);

        $this->app->bind(TenantRepositoryInterface::class, EloquentTenantRepository::class);
        $this->app->bind(UserRepositoryInterface::class, EloquentUserRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Relation::enforceMorphMap([
            'user' => User::class,
            'tenant' => Tenant::class,
        ]);
    }
}
