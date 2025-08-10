<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('react');
});
// routes/web.php
Route::get('/{any}', function () {
    return view('react'); // or your main blade file
})->where('any', '.*');
