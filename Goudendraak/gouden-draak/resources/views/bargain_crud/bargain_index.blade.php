@extends('layout')

@section('content')
    <div id="app" class="container bg-white">
        <h3 class="text-center mb-3">Alle huidige aanbiedingen</h3>

        <div class="container">
            <bargains-table class="bg-Menu" :bargains='{!! json_encode($activeBargains) !!}'></bargains-table>
        </div>
    </div>
@endsection
