<?php

namespace App\Providers;

use App\Models\Docrh;
use App\Models\Sharedoc;
use App\Models\Docarchives;
use App\Observers\DocrhsObserver;
use App\Observers\SharedocObserver;
use Illuminate\Support\Facades\Vite;
use App\Observers\DocarchiveObserver;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        // 2. Ajoutez cette ligne
        Schema::defaultStringLength(191);

        // Observer
        Docarchives::observe(DocarchiveObserver::class);
        Docrh::observe(DocrhsObserver::class);
        Sharedoc::observe(SharedocObserver::class);
    }

}
