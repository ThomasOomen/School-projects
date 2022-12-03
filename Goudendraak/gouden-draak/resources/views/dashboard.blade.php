@extends('layout')

@section('content')
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div id="app" class="py-12 bg-white">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            Admin pagina

            <a class="btn btn-primary" href="{{ url('dashboard/product-create') }}">Create product</a>

            <table class="table table-bordered">
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>On the menu</th>
                    <th colspan="2">actions</th>
                </tr>
                @foreach ($products as $product)
                    <tr>
                        <th scope="row">{{ $product->name }}</th>
                        <td>€ {{ $product->price }}</td>
                        <td>{{ $product->description }}</td>
                        <td>{{ $product->onTheMenu }}</td>
                        <td>
                            <a class="btn btn-primary" type="submit"
                               href="{{ url('dashboard/product-edit', $product->id) }}">
                                Aanpassen
                            </a>
                        </td>
                        <td>
                            <a class="btn btn-primary" type="submit"
                               href="{{ url('dashboard/product-delete', $product->id) }}">
                                Verwijderen</a>
                        </td>
                    </tr>
                @endforeach
            </table>
        </div>
    </div>
@endsection
