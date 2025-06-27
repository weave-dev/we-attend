<?php

namespace Modules\Attendance\Providers;

use Illuminate\Support\ServiceProvider;

class AttendanceServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->routes();
    }

    public function routes(): void
    {
        $this->loadRoutesFrom(base_path("routes/attendance.php"));
    }
}
