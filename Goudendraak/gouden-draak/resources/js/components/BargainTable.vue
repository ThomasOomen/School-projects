<template>
    <div class="container pt-4">
        <h4 class="text-center"></h4>
        <table class="table table-borderless border-top border-secondary">
            <thead>
            <tr>
                <th class="w-5" scope="col">#</th>
                <th class="w-10" scope="col">Gerecht</th>
                <th class="w-10" scope="col">Begin Datum actie</th>
                <th class="w-10" scope="col">Eind Datum actie</th>
                <th class="w-10" scope="col">Prijs</th>
                <th class="w-10" scope="col">Originele Prijs</th>
            </tr>
            </thead>
            <tr v-if="!bargains.length">
                <th class="w-5"></th>
                <th class="w-25">Er zijn geen acties op het moment</th>
                <td scope="row" class="w-20"></td>
                <td class="w-20"></td>
                <th class="w-15"></th>
                <td class="w-15"></td>
            </tr>
            <tbody v-for="item in bargains">
            <tr v-for="product in item.products">
                <th class="w-5">{{product.menu_item.menuNumber}}{{product.menu_item.menuNumberAddon}}</th>
                <th class="w-25">{{product.name}}</th>
                <td scope="row" class="w-20">{{item.startDate}}</td>

                <td class="w-20">{{item.endDate}}</td>

                <th class="w-15">€{{product.pivot.price}}</th>
                <td class="w-15">€{{product.price}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ["bargains"],
    data() {
        return {};
    },
    mounted() {
    },
    methods: {}
};
</script>




