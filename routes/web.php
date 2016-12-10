<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/{table}', function ($model) {
    $model       = 'App\\'.$model;
    $table       = new $model();
    $data        = $table->all()->toJson();
   return response()->json($data);
});


Route::post('/{table}', function ($model,Illuminate\Http\Request $request) {
        $model = 'App\\'.ucfirst($model);
        $isSave = $model::find($request->id)->update([
            "{$request->title}" => $request->value
        ]);
    if ( $isSave ) {
        return response()->json([ 'title' => $request->title, 'value' => $request->value , 'id' => $request->id]);
    }

});
