@extends('layout')

@section('content')
    <div id="app" class="container bg-white">
        <h3 class="text-center">Bestelling herhalen</h3>
        <div class="container">
            @if($errors->any())
                {!! implode('', $errors->all('<div class="text-danger">:message</div>')) !!}
            @endif
            <table class="table">
                <thead class="bg-darkred">
                <tr class="text-yellow">
                    <th class="w-10">Datum</th>
                    <th class="w-20" scope="col">Naam</th>
                    <th class="w-5" scope="col">Aantal</th>
                    <th scope="col" class="w-5">Totaal Prijs</th>
                    <th class="w-5"></th>

                </tr>
                </thead>
                <tbody id="myTable" class="bg-Menu text-dark">
                @foreach($sales as $sale)
                    <tr>
                        <th class="w-10"> {{$sale->saleDate}}</th>
                        <td class="w-20" scope="row">
                            @foreach($sale->products as $product)
                                <div>{{$product->name}}</div>
                            @endforeach
                        </td>
                        <td class="w-5">
                            @foreach($sale->products as $product)
                                <div>{{$product->pivot->amount}}</div>
                            @endforeach
                        </td>
                        <td class="w-5">€ {{$sale->price}}</td>
                        <td class="w-5">
                            <form method="POST" class="bg-menu mb-0" action="{{ url('order-repeat-store') }}">
                                @csrf
                                <input name="saleId" type="hidden" value="{{$sale->id}}">
                                <input name="tableId" type="hidden" value="{{$sale->dinner_table_id}}">
                                <input type="submit" class="btn btn-dark text-white" value="Bestel opnieuw">
                            </form>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
@endsection
