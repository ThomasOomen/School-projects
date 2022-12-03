@extends('layout')

@section('content')
    <div id="app" class="container bg-white">
        <h3 class="text-center">Kassamedewerker overzicht</h3>
        <order-table :sales='{!! json_encode($sales) !!}'></order-table>
    </div>
@endsection
