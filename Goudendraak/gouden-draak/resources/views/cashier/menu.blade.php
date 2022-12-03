@extends('layout')

@section('content')
    <div id="app" class="container bg-white">
        <h3 class="text-center">Kassamedewerker overzicht</h3>
        <cashier-menu-table :products='{!! json_encode($products) !!}'></cashier-menu-table>
    </div>
@endsection
