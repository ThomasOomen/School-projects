@extends('layout')

@section('content')
    <div id="app" class="container">
        <div class="card">
            <div class="card-header bg-darkred text-center">
                <div class="d-flex flex-row justify-content-between">
                    <img class="w-15" src="{{asset('/images/dragon-small.png')}}" alt="Image" />
                    <div>
                        <h1 class="mt-5 text-yellow text-Chinesefont">De Gouden Draak</h1>
                        <small class="text-yellow text-Chinesefont">Chinees Indische Specialiteiten</small>
                    </div>
                    <img class="w-15" src="{{asset('/images/dragon-small-flipped.png')}}" alt="Image" />
                </div>
            </div>

            <div class="card-body bg-Menu text-dark">

                <div class="d-flex justify-content-center">
                    <div class="w-25 d-flex flex-column">
                        <div class="mt-3 d-flex flex-row justify-content-around">
                            <a class="btn btn-dark text-white" href="{{ url('menu-card')}}">Menukaart</a>
                            <a class="btn btn-dark text-white" href="{{ url('news') }}">Nieuws</a>
                            <a class="btn btn-dark text-white" href="{{ url('contact')  }}">Contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
@endsection
