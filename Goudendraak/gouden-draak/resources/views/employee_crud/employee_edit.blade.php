@extends('layout')

@section('content')
    <div id="app" class="py-12 bg-white">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">

            <a class="btn btn-primary" href="{{ url('employee-index') }}">Back</a>

            Edit employee form

            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <form action="{{ url('employee-update') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <input type="hidden" required name="id" value="{{$user->id}}"/>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Naam</strong>
                        <label for="name"></label>
                        <input type="text" id="name" name="name" class="form-control"
                               value="{{ $user->name }}">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>E-mail</strong>
                        <label for="email"></label>
                        <input type="text" id="email" name="email" class="form-control"
                               value="{{ $user->email }}">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <label for="role">
                        <strong>Role</strong>
                    </label>
                    <select class="custom-select mr-sm-2" id="role" name="role">
                        @foreach($roles as $role)
                            @if($role->id === $user->role_id)
                                <option value="{{ $role->id }}" selected>{{ $role->name }}</option>
                            @else
                                <option value="{{ $role->id }}">{{ $role->name }}</option>
                            @endif
                        @endforeach
                    </select>
                </div>
                <button type="submit" class="btn btn-primary ml-3">Submit</button>
            </form>
        </div>
    </div>
@endsection
