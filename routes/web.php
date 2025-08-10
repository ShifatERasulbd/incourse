<?php

use Illuminate\Support\Facades\Route;

// Main site routes
Route::get('/', function () {
    return view('react');
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
