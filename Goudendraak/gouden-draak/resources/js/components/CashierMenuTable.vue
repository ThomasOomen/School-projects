<template>
    <div class="container">
        <input
            class="w-100 bg-light border form-control"
            id="myInput"
            name="searchCategory"
            type="text"
            placeholder="Zoek in gerechten... op nummer, productype, naam"
        />
        <table class="table">
            <thead class="bg-darkred">
            <tr class="text-yellow header">
                <th class="w-5"></th>
                <th class="w-25" scope="col">Naam</th>
                <th scope="col" class="w-10">Prijs</th>
                <th class="w-25" scope="col">Beschrijving</th>
                <th scope="col">Product type</th>
            </tr>
            </thead>
            <tbody id="myTable" class="bg-Menu text-dark">
            <tr v-for="item in products">
                <td>
                    <b>{{item.menu_item.menuNumber}}{{item.menu_item.menuNumberAddon}}</b>
                </td>
                <td scope="row">{{item.name}}</td>
                <td>€ {{item.price}}</td>
                <td>
                    <div v-if="item.description === null">-</div>
                    <div v-if="item.description != null">{{item.description}}</div>
                </td>
                <td>{{item.product_type.name}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ["products"],
    data() {
        return {};
    },
    methods: {}
};
$(document).ready(function() {
    function myFunction() {
        let searchRows = [0, 1, 4];
        let visibleRows = [];

        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            searchRows.forEach(element => {
                td = tr[i].getElementsByTagName("td")[element];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        visibleRows.push(i);
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            });
        }
        visibleRows.forEach(element => {
            tr[element].style.display = "";
        });
    }

    let input = document.getElementById("myInput");
    if (input) {
        input.addEventListener("keyup", function(e) {
            myFunction();
        });
    }
});
</script>

