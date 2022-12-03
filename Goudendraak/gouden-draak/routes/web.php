<?php

use App\Http\Controllers\BargainController;
use App\Http\Controllers\CashierController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'showHomePage']);

Route::middleware('can:admin-role')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    Route::get('/dashboard/product-create', [DashboardController::class, 'product_create']);
    Route::post('/dashboard/product-store', [DashboardController::class, 'product_store']);
    Route::get('/dashboard/product-edit/{id}', [DashboardController::class, 'product_edit']);
    Route::post('/dashboard/product-update', [DashboardController::class, 'product_update']);
    Route::get('/dashboard/product-delete/{id}', [DashboardController::class, 'product_destroy']);

    Route::get('/employee-index', [EmployeeController::class, 'employee_index']);
    Route::get('/employee-create', [EmployeeController::class, 'employee_create']);
    Route::post('/employee-store', [EmployeeController::class, 'employee_store']);
    Route::get('/employee-edit/{id}', [EmployeeController::class, 'employee_edit']);
    Route::post('/employee-update', [EmployeeController::class, 'employee_update']);
    Route::get('/employee-delete/{id}', [EmployeeController::class, 'employee_destroy']);
});

Route::middleware('can:kassa-role')->group(function () {
    Route::get('/order-index', [OrderController::class, 'order_index']);
    Route::get('/find-product', [CashierController::class, 'cashierMenu_index']);
    Route::get('/bargain-create', [BargainController::class, 'bargain_create']);
    Route::post('/bargain-store', [BargainController::class, 'bargain_store']);
});

Route::get('/menu-card', [HomeController::class, 'showMenuCard']);
Route::get('/make-menu-pdf', [HomeController::class, 'makeMenuPDF']);

Route::get('/bargain-index', [BargainController::class, 'bargain_index']);

Route::get('/news', [HomeController::class, 'showNews']);
Route::get('/contact', [HomeController::class, 'showContact']);

Route::get('/order', [OrderController::class, 'order_create']);
Route::post('/order-store', [OrderController::class, 'order_store']);
Route::get('/order-repeat', [OrderController::class, 'order_repeat']);
Route::get('/order-repeat-step-2/{id}', [OrderController::class, 'order_repeat_step_2']);
Route::post('/order-repeat-store', [OrderController::class, 'order_repeat_store']);

Route::get('/order-takeaway', [OrderController::class, 'order_takeaway_create']);
Route::post('/order-takeaway-store', [OrderController::class, 'order_takeaway_store']);

require __DIR__.'/auth.php';
