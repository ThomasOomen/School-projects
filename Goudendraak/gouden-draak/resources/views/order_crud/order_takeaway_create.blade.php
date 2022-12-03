@extends('layout')
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>

@section('content')
    <div id="app" class="container bg-white">
        <h3 class="text-center p-3">Bestellen voor takeaway</h3>
        <div class="container">
            @if($errors->any())
                {!! implode('', $errors->all('<div class="text-danger">:message</div>')) !!}
            @endif
            <div class="form-group">
                <form method="POST" class="bg-menu mb-0" action="{{ url('order-takeaway-store') }}">
                    @csrf
                    <div class="table-responsive">
                        <table class="table table-borderless" id="dynamic_field">
                            <tr>
                                <td>
                                    <label for="name">Naam</label>
                                    <input id="name" name="name" class="form-control" type="text" placeholder="Naam">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label for="selectbox1">Kies product</label>
                                    <select id="selectbox1" class="form-control name_list menuItemSelectbox" name="products[]">
                                        @foreach($products as $product)
                                            <option value="{{$product->id}}">
                                                {{$product->menuItem->menuNumber}}{{$product->menuItem->menuNumberAddon}} {{$product->name}}
                                            </option>
                                        @endforeach
                                    </select>
                                </td>
                                <td class="w-15"><label for="priceInput">Aantal</label>
                                    <input min="1" id="quantityInput1" type="number" step="1" name="quantity[]" value="1" class="  form-control name_list QuantityInput" />
                                </td>
                                <td><label for="price1">Prijs </label>
                                    <h3 id="price1" class="pricetag align-text-center">€ {{$products[0]->price}}</h3>
                                </td>
                            </tr>
                        </table>
                        <button type="button" name="add" id="add" class="btn btn-dark">Extra product toevoegen</button>
                        <div class="d-flex ">
                            <h2 id="totalPrice" class=" text-center pl-5"></h2>
                        </div>
                        <input type="submit" name="submit" id="submit" class="btn btn-dark ml-3 mb-3" value="Bestellen" />
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
            $('#dynamic_field').append('<tr id="row' + i + '"><td><select class="form-control name_list" id="selectbox' + i + '" name="products[]">@foreach($products as $product)<option value="{{$product->id}}"> {{$product->menuItem->menuNumber}}{{$product->menuItem->menuNumberAddon}} {{$product->name}}</option>@endforeach</select><td class="w-15"><input type="number"  id="quantityInput' + i + '" step="1" name="quantity[]" value="1" class=" form-control name_list min="1" QuantityInput" /><td><h3 id="price' + i + '" class=" align-text-center pricetag">€ {{$products[0]->price}}</h3></td><td><button type="button" name="remove" id="' + i + '" class="btn btn-danger btn_remove">X</button></td></tr>');
            addEventListeners(i);
            changeTotalPriceAttribute();
        });
        $(document).on('click', '.btn_remove', function() {
            var button_id = $(this).attr("id");
            $('#row' + button_id + '').remove();
            changeTotalPriceAttribute();
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
        addEventListeners(1);
        changeTotalPriceAttribute();

        function changeTotalPriceAttribute() {
            document.getElementById('totalPrice').innerHTML = 'Totaalprijs: € ' + calculateTotalPrice()
        }

        function addEventListeners(addedIndex) {
            let productPrices = [];
            @foreach($products as $product)
            productPrices.push('{{$product->price}}');
            @endforeach;


            let selectBox = document.getElementById('selectbox' + addedIndex)
            selectBox.addEventListener('change', (event) => {
                let price = productPrices[selectBox.value - 1]
                quantity = document.getElementById('quantityInput' + addedIndex).value;
                rowPrice = (price * quantity).toFixed(2);

                document.getElementById('price' + addedIndex).innerHTML = '€ ' + rowPrice;
                changeTotalPriceAttribute();
            })

            let quantityInput = document.getElementById('quantityInput' + addedIndex);
            quantityInput.addEventListener('input', (event) => {
                let productIndex = document.getElementById('selectbox' + addedIndex).value;
                let price = productPrices[productIndex - 1]
                quantity = quantityInput.value;
                rowPrice = (price * quantity).toFixed(2);

                document.getElementById('price' + addedIndex).innerHTML = '€ ' + rowPrice;
                changeTotalPriceAttribute();
            })
        };

        function calculateTotalPrice() {
            let prices = document.querySelectorAll('.pricetag');
            let totalPrice = 0;
            prices.forEach(element => {
                let price = element.innerHTML;
                price = price.split("€");
                price = parseFloat(price[1]);

                totalPrice = totalPrice + price;
            });
            return totalPrice.toFixed(2);
        }
    });
</script>
