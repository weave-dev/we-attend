<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('attendance.index');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::group(['as' => 'attendance.', 'prefix' => 'attendance'], function () {
    Route::get('/', function () {
        return Inertia::render('attendance/index');
    })->name('index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
