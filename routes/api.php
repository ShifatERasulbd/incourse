<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\SliderController;
use App\Http\Controllers\Api\AboutUsController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\WhyChooseUsController;
use App\Http\Controllers\Api\CounterController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\FrontendController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Public routes (for frontend) - Individual endpoints
Route::get('/sliders/active', [SliderController::class, 'active']);
Route::get('/about-us/active', [AboutUsController::class, 'getActive']);
Route::get('/products/active', [ProductController::class, 'getActive']);
Route::get('/products/{id}', [FrontendController::class, 'getProductDetails']);
Route::get('/categories/active', [CategoryController::class, 'getActive']);
Route::get('/blogs/published', [BlogController::class, 'getPublished']);
Route::get('/blogs/{id}', [FrontendController::class, 'getBlogDetails']);
Route::get('/debug/blogs', [FrontendController::class, 'debugBlogs']);
Route::get('/why-choose-us/active', [WhyChooseUsController::class, 'getActive']);
Route::get('/counters/active', [CounterController::class, 'getActive']);
Route::get('/contact', [FrontendController::class, 'getContact']);

// Frontend data endpoints - Optimized for frontend consumption
Route::prefix('frontend')->group(function () {
    Route::get('/all-data', [FrontendController::class, 'getAllData']);
    Route::get('/homepage', [FrontendController::class, 'getHomepageData']);
    Route::get('/sliders', [FrontendController::class, 'getSliders']);
    Route::get('/about-us', [FrontendController::class, 'getAboutUs']);
    Route::get('/products', [FrontendController::class, 'getProducts']);
    Route::get('/products/{id}', [FrontendController::class, 'getProductDetails']);
    Route::get('/categories', [FrontendController::class, 'getCategories']);
    Route::get('/blogs', [FrontendController::class, 'getBlogs']);
    Route::get('/blogs/{id}', [FrontendController::class, 'getBlogDetails']);
    Route::get('/debug/blogs', [FrontendController::class, 'debugBlogs']);
    Route::get('/why-choose-us', [FrontendController::class, 'getWhyChooseUs']);
    Route::get('/counters', [FrontendController::class, 'getCounters']);
    Route::get('/contact', [FrontendController::class, 'getContact']);

    // Public settings endpoint (for admin panel without auth)
    Route::get('/admin/settings/public', [App\Http\Controllers\Admin\SettingController::class, 'publicIndex']);
});

// Admin dashboard routes
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard']);
    Route::get('/users', function () {
        return \App\Models\User::all(['id', 'name', 'email', 'created_at']);
    });

    // Slider management routes
    Route::apiResource('sliders', SliderController::class);
    Route::post('/sliders/update-order', [SliderController::class, 'updateOrder']);

    // About Us management routes
    Route::get('/about-us', [AboutUsController::class, 'index']);
    Route::post('/about-us', [AboutUsController::class, 'store']);

    // Product and Category management routes
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);

    // Blog management routes
    Route::apiResource('blogs', BlogController::class);

    // Why Choose Us management routes
    Route::apiResource('why-choose-us', WhyChooseUsController::class);
    Route::post('/why-choose-us/update-order', [WhyChooseUsController::class, 'updateOrder']);

    // Counter management routes
    Route::apiResource('counters', CounterController::class);
    Route::post('/counters/update-order', [CounterController::class, 'updateOrder']);

    // Contact management routes
    Route::apiResource('contacts', ContactController::class);
    Route::post('/contacts/{contact}/toggle-active', [ContactController::class, 'toggleActive']);

    // Settings management routes
    Route::apiResource('settings', SettingController::class);
    Route::post('/settings/{setting}/toggle-active', [SettingController::class, 'toggleActive']);
});
