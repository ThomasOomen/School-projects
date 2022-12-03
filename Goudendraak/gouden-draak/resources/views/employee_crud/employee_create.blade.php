@extends('layout')

@section('content')
    <div class="py-12 bg-white">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            Admin pagina

            <a class="btn btn-primary" href="{{ url('/employee-index') }}">Back</a>

            Create product form

            @if ($errors->any())
                <div class="alert alert-danger">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif
            <form action="{{ url('employee-store') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Naam</strong>
                        <label for="name"></label>
                        <input type="text" id="name" name="name" class="form-control"
                               value="{{ old('name') }}">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>E-mail</strong>
                        <label for="email"></label>
                        <input type="text" id="email" name="email" class="form-control"
                               value="{{ old('email') }}">
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div class="form-group">
                        <strong>Password</strong>
                        <label for="password"></label>
                        <input id="password" class="form-control"
                               type="password"
                               name="password"
                               required autocomplete="new-password" />
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <label for="role">
                        <strong>Role</strong>
                    </label>
                    <select class="custom-select mr-sm-2" id="role" name="role">
                        @foreach($roles as $role)
                            <option value="{{ $role->id }}">{{ $role->name }}</option>
                        @endforeach
                    </select>
                </div>
                <button type="submit" class="btn btn-primary ml-3">Submit</button>
            </form>
        </div>
    </div>
@endsection
