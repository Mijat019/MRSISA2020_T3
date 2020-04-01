<template>
    <v-card>
        <v-card-title>
            Clinics
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="getClinics"
            :search="search"
        ></v-data-table>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "ManageClinics",
    data() {
        return {
            search: "",
            headers: [
                {
                    text: "Name",
                    value: "name"
                },
                {
                    text: "Address",
                    value: "address"
                },
                {
                    text: "Description",
                    value: "description"
                }
            ]
        };
    },

    methods: {
        ...mapActions("clinics", {
            getClinicsActions: "getClinicsActions"
        })
    },

    async mounted() {
        await this.getClinicsActions();
    },

    computed: {
        ...mapGetters("clinics", {
            getClinics: "getClinics"
        })
    }
};
</script>

<style></style>
