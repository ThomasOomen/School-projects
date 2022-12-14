<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('admin-role', function ($user) {
            if ($user->role->name == 'admin') {
                return true;
            }
            return false;

        });
        Gate::define('kassa-role', function ($user) {
            if ($user->role->name == 'kassamedewerker') {
                return true;
            }
            return false;
        });
    }
}
