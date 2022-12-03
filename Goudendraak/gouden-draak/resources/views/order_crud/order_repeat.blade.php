@extends('layout')
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

@section('content')
    <div id="app" class="container bg-white">
        <h3 class="text-center">Bestelling herhalen</h3>

        <div class="container" id="OrderRepeat">
            <label for="tableNumberSelect">Kies je tafelnummer</label>
            <select id="tableNumberSelect" class="w-50 form-control mb-5">
                @foreach($tables as $table)
                    <option value="{{$table->id}}">{{$table->table_number}}</option>
                @endforeach
            </select>

            <a id="nextStepButton" class="mt-3 btn btn-dark text-white">Volgende stap</a>
        </div>
    </div>
@endsection

<script>
    $(document).ready(function() {
        document.getElementById('nextStepButton').addEventListener('click',function(e){
            let value = document.getElementById('tableNumberSelect').value;
            window.location.href = '/order-repeat-step-2/' + value;
        });
    });
</script>
