@extends('layout')

@section('content')
    <div id="app" class="container bg-white">
        <div class="border border-dark container bg-Menu">
            <h3>De Gouden Draak is eenvoudig te vinden, vlak bij het centrum, 5 minuten lopen achter het centraal station.
                <br>
                <br>
                Onderwijsboulevard 215, kamer OG112<br> 5223 DE 's-Hertogenbosch
            </h3>
        </div>

        <div class="d-flex justify-content-center">
            <img class="border-left border-right border-bottom border-dark w-75"
                 src="{{asset('images/2020-03-24_1406.png')}}" alt="location">
        </div>
    </div>
@endsection
