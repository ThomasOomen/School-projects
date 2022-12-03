@extends('layout')

@section('content')
    <div id="app" class="py-12 bg-white">

        <a class="btn btn-primary" href="{{ url('employee-create') }}">Add employee</a>

        <table class="table table-bordered">
            <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Role</th>
                <th colspan="2">actions</th>
            </tr>
            @foreach($users as $user)
                <tr>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->role->name }}</td>
                    @if($user->name !== 'admin')
                        <td>
                            <a class="btn btn-primary" type="submit"
                               href="{{ url('employee-edit', $user->id) }}">
                                Aanpassen
                            </a>
                        </td>
                        <td>
                            <a class="btn btn-primary" type="submit"
                               href="{{ url('employee-delete', $user->id) }}">
                                Verwijderen</a>
                        </td>
                    @endif
                </tr>
            @endforeach
        </table>
    </div>
@endsection
