<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Modules\Attendance\Controllers\AttendanceController;

Route::group(['as' => 'attendance.', 'prefix' => 'attendances', 'middleware' => ['web']], function () {
    Route::get('/', function () {
        return Inertia::render('attendance/cico');
    })->name('cico');

    Route::post('/', [AttendanceController::class, 'store'])->name('store');

    Route::middleware(['auth'])->group(function () {
        Route::get('/list', function () {
            return Inertia::render('attendance/list');
        })->name('list');
    });
});
