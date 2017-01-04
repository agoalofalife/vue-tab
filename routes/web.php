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



Route::get('test', function (){

    $schema = DB::getDoctrineSchemaManager();
    dd($schema->listTableDetails('posts'));
});
//example get getForeignKeys
Route::get('fields-databases', function (){

    $schema = DB::getDoctrineSchemaManager();
    $columns = $schema->listTableDetails('posts')->getForeignKeys();
    $column = array_shift($columns);
//    dd($column->getForeignTableName());  name table
//    dd($column->getForeignColumns()); name column in externel table
//    dd($column->getLocalColumns()); name key example user_id

//    dd($column->getColumns());
    dd($columns);
//    dd($columns['id']->getType());
    foreach ($columns as $column) { //run loop
        echo $column->getType() . '<br>'; //here you can define your inputes
    }
});



Route::get('/', function () {
    return view('welcome');
});

Route::get('/{table}', function ($model) {

    if ( Schema::hasTable($model) )
    {
        $data = DB::table($model)->get()->toJson();
        return response()->json($data);
    }
   return response()->json([], 404);
});


Route::post('/{table}', function ($model,Illuminate\Http\Request $request) {

    $isSave = DB::table($model)->where('id', $request->id)->update([
        $request->title => $request->value
    ]);

    if ( $isSave ) {
        return response()->json([ 'title' => $request->title, 'value' => $request->value , 'id' => $request->id]);
    }

});

Route::delete('/{table}', function ($model, Illuminate\Http\Request $request){

    $isDelete = DB::table($model)->where('id', $request->id)->delete();
    if ( $isDelete ) {
        return response()->json([ 'id' => $request->id]);
    }
});

// get all list tables in database
Route::get('/table/getAll', function (){
    return response()->json([ 'list' => DB::select('SHOW TABLES')]);
});

