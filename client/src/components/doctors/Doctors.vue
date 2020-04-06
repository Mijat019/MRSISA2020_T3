<template>
    <v-card>
        <v-card-title>
            Doctors
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>

        <DoctorDialog></DoctorDialog>

        <v-data-table :headers="headers" :items="getDoctors" :search="search">
        </v-data-table>
    </v-card>


</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DoctorDialog from "./DoctorDialog";
export default {
    name: "ManageDoctors",
    components: {
        DoctorDialog
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
        ...mapActions("doctors", {
            getDoctorsAction: "getDoctorsAction"
        })
    },

    async mounted() {
        await this.getDoctorsAction();
    },

    computed: {
        ...mapGetters("doctors", {
            getDoctors: "getDoctors"
        })
    }
};
</script>

<style>
</style>