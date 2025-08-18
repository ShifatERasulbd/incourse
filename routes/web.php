<?php

use Illuminate\Support\Facades\Route;

// Main site routes
Route::get('/', function () {
    return view('react');
});

// Public Settings API Routes (NO AUTHENTICATION REQUIRED)
Route::prefix('api/public')->group(function () {
    Route::get('/settings', [App\Http\Controllers\Admin\SettingController::class, 'publicIndex']);
    Route::post('/settings', [App\Http\Controllers\Admin\SettingController::class, 'publicStore']);
    Route::put('/settings/{setting}', [App\Http\Controllers\Admin\SettingController::class, 'publicUpdate']);
    Route::delete('/settings/{setting}', [App\Http\Controllers\Admin\SettingController::class, 'publicDestroy']);
    Route::post('/settings/{setting}/toggle', [App\Http\Controllers\Admin\SettingController::class, 'publicToggle']);
});

// Admin panel routes
Route::prefix('admin')->group(function () {
    Route::get('/login', function () {
        return view('admin');
    });
    Route::get('/{any?}', function () {
        return view('admin');
    })->where('any', '.*');
});

// Catch-all route for main site
Route::get('/{any}', function () {
    return view('react');
})->where('any', '^(?!admin).*');
