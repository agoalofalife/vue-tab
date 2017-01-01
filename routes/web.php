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

    if ( Schema::hasTable($model) )
    {
        $data = DB::table($model)->get()->toJson();
        return response()->json($data);
    }

//    $model           = 'App\\'.$model;
//
//    if ( class_exists($model) )
//    {
//        $table       = new $model();
//        $data        = $table->all()->toJson();
//        return response()->json($data);
//    }

   return response()->json([], 404);
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

Route::delete('/{table}', function ($model, Illuminate\Http\Request $request){
    $model  = 'App\\'.ucfirst($model);
    $delete = $model::destroy($request->id);

    if ( $delete ) {
        return response()->json([ 'id' => $request->id]);
    }
});

// get all list tables in database
Route::get('/table/getAll', function (){
    return response()->json([ 'list' => DB::select('SHOW TABLES')]);
});