<template>
    <div class="container">
        <table class="table" id="dtBasicExample">
            <thead class="bg-darkred">
            <tr class="text-yellow">
                <th class="w-20">Besteldatum</th>
                <th class="w-10" scope="col">TafelNummer</th>
                <th class="w-10" scope="col" >Prijs</th>
                <th class="w-30" scope="col">Producten</th>
                <th class="w-10" scope="col">Aantal</th>
            </tr>
            </thead>
            <tbody id="myTable" class="bg-Menu text-dark">
            <tr v-if="!sales.length">
                <th class="w-20">Er zijn geen Bestellingen in het restaurant</th>
                <td class="w-10"></td>
                <td class="w-10"></td>
                <td class="w-30"></td>
                <td class="w-10"></td>
            </tr>
            <tr v-for="item in sales">
                <th class="w-20">{{item.saleDate}}</th>
                <td class="w-10">{{item.dinner_table.table_number}}</td>
                <td class="w-10">€ {{item.price}}</td>
                <td class="w-30">
                    <div v-for="product in item.products">
                        {{product.menuitem.menuNumber}}{{product.menuitem.menuNumberAddon}}. {{product.name}}</div>
                </td>
                <td class="w-10">
                    <div v-for="product in item.products">
                        {{product.pivot.amount}}
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ["sales"],
    data() {
        return {};
    },
    methods: {}
};

$(document).ready(function() {
    $("#myInput").on("keyup", function() {
        var value = $(this)
            .val()
            .toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle(
                $(this)
                    .text()
                    .toLowerCase()
                    .indexOf(value) > -1
            );
        });
    });
});
</script>

