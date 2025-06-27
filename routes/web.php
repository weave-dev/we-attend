<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('attendance.cico');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('user-management', action: function () {
        return Inertia::render('dashboard');
    })->name('user-management');
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
