<h2 class="text-center">De Gouden Draak Menukaart</h2>
<div class="container">
    <table style="width: 100%;">
        <thead>
        <tr>
            <td class="w-5"><b>#</b></td>
            <td class="w-50"><b>Gerecht</b></td>
            <td class="w-25"><b>Beschrijving</b></td>
            <td class="w-20"><b>Prijs</b></td>
        </tr>

        </thead>
        <tbody>

        @foreach($menuCategories as $menu_category)
            @foreach($menu_category as $product)
                <tr>
                    <td class="w-5">{{$product->menuItem->menuNumber}}</td>
                    <td class="w-50">{{$product->name}}</td>
                    <td class="w-25">
                        @if($product->description == null)-@endif
                        @if($product->description != null){{$product->description}}@endif
                    </td>
                    <td class="w-20">€ {{$product->price}}</td>
                </tr>

            @endforeach
        @endforeach
        </tbody>
    </table>
    <div style="page-break-after:always;"></div>


    <h2>Huidige acties</h2>
    <table>
        <thead>
        <tr>
            <td class="w-5"><b>Gerecht</td>
            <td class="w-50"><b>Begin datum actie</b></td>
            <td class="w-25"><b>Eind datum actie</b></td>
            <td class="w-20"><b>Nieuwe prijs</b></td>
        </tr>

        </thead>
        <tbody>
        @foreach($activeBargains as $bargain)

            @foreach($bargain->products as $product)
                <tr>
                    <td class="w-40">{{$product->name}}</td>
                    <td class="w-20 pl-3">{{$bargain->startDate}}</td>
                    <td class="w-20 pl-3">{{$bargain->endDate}}</td>
                    <td class="w-20 pl-3">{{$product->pivot->price}} </td>
                </tr>
            @endforeach
        @endforeach
        </tbody>
    </table>
</div>

<style>
    .w-5 {
        width: 5%;
    }

    .w-50 {
        width: 50%;
    }

    .w-20 {
        width: 20%;
    }

    .w-25 {
        width: 25%;
    }
    .w-40 {
        width: 40%;
    }

    .pl-3{
        padding-left: 3%;
    }

    .text-center {
        text-align: center;
    }
</style>
