<template>
    <div class="container pt-4">
        <h4 class="text-center">
            <b>{{ menu[0].product_type.name }}</b>
        </h4>
        <table class="table table-borderless border-top border-secondary">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Gerecht</th>
                <th scope="col">Beschrijving</th>
                <th scope="col">Prijs</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in menu">
                <th scope="row" class="w-5">{{item.menu_item.menuNumber}}{{item.menu_item.menuNumberAddon}}</th>

                <td class="w-50">{{item.name}}</td>

                <td class="w-25">
                    <div v-if="item.description === null">-</div>
                    <div v-if="item.description != null">{{item.description}}</div>
                </td>
                <td class="w-20">€ {{item.price}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props: ["menu"],
        data() {
            return {};
        },
        methods: {}
    };
</script>
