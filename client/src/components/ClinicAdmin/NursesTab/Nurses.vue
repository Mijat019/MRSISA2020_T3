<template>
    <v-card>
        <v-card-title>
            Nurses
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>

        <v-btn dark class="mb-2" @click="showAddDialog">Add nurse</v-btn>
        <NurseDialog></NurseDialog>

        <v-data-table :headers="headers" :items="getNurses" :search="search" @click:row="showEditDialog">\
        </v-data-table>
    </v-card>


</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import NurseDialog from "./NurseDialog";
export default {
    name: "ManageNurses",
    components: {
        NurseDialog
    },
    data() {
        return {
            search: "",
            headers: [
                {
                    text: "First name",
                    value: "firstName"
                },
                {
                    text: "Last name",
                    value: "lastName"
                },
                {
                    text: "City",
                    value: "city"
                }
            ]
        };
    },

    methods: {
        ...mapActions("nurses", {
            getNursesAction: "getNursesAction"
        }),

        ...mapMutations("nurses", {
            showAddDialog: "openAddDialog",
            showEditDialog: "openEditDialog"
        })
    },

    async mounted() {
        await this.getNursesAction();
    },

    computed: {
        ...mapGetters("nurses", {
            getNurses: "getNurses"
        })
    }
};
</script>

<style>
</style>