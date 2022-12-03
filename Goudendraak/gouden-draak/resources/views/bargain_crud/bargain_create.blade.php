@extends('layout')

@section('content')
    <div id="app" class="container bg-white">
        <h3 class="text-center">Aanbiedingen pagina</h3>
        <div class="container">
            @if($errors->any())
                {!! implode('', $errors->all('<div class="text-danger">:message</div>')) !!}
            @endif
            <br />
            <br />
            <div class="form-group">
                <form method="POST" class="bg-menu mb-0" action="{{ url('bargain-store') }}">
                    @csrf
                    <div class="table-responsive">
                        <table class="table table-borderless" id="dynamic_field">
                            <tr>
                                <td>
                                    <label for="startDate">Begin datum</label>
                                    <input name="startDate" type="date" id="startDate" class=" w-50 form-control">
                                </td>
                                <td>
                                    <label for="endDate">Eind datum</label>
                                    <input name="endDate" type="date" id="endDate" class="form-control">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="productSelect">Kies product</label>
                                    <select id="productSelect" class="form-control name_list" name="products[]">
                                        @foreach($products as $product)
                                            <option value="{{$product->id}}">
                                                {{$product->menuItem->menuNumber}}{{$product->menuItem->menuNumberAddon}} {{$product->name}}
                                            </option>
                                        @endforeach
                                    </select>
                                </td>
                                <td><label for="priceInput">Actie prijs</label><input id="priceInput" type="number" step="0.01" name="price[]" value="0.00" class="form-control name_list" />
                                <td>
                                <td><button type="button" name="add" id="add" class="btn btn-dark">Extra product toevoegen</button></td>
                            </tr>
                        </table>
                        <input type="submit" name="submit" id="submit" class="btn btn-dark ml-3 mb-3" value="Submit" />
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection



<script>
    $(document).ready(function() {
        var i = 1;
        $('#add').click(function() {
            i++;
            $('#dynamic_field').append('<tr id="row' + i + '"><td><select class="form-control name_list" name="products[]">@foreach($products as $product)<option value="{{$product->id}}"> {{$product->menuItem->menuNumber}}{{$product->menuItem->menuNumberAddon}} {{$product->name}}</option>@endforeach</select><td><input type="number" step="0.01" name="price[]" value="0.00" class="form-control name_list" /><td><button type="button" name="remove" id="' + i + '" class="btn btn-danger btn_remove">X</button></td></tr>');
        });

        $(document).on('click', '.btn_remove', function() {
            var button_id = $(this).attr("id");
            $('#row' + button_id + '').remove();
        });

        $('#submit').click(function() {
            $.ajax({
                url: "name.php",
                method: "POST",
                data: $('#add_name').serialize(),
                success: function(data) {
                    alert(data);
                    $('#add_name')[0].reset();
                }
            });
        });
    });
</script>
