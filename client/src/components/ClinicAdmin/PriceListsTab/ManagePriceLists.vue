<template>
  <v-card>
    <v-card-title>
      Price Lists
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <!-- @click:row="showEditDialog" -->
    <PriceListsDialog />
    <v-card-text>
      <v-data-table :headers="headers" :items="getPriceLists" :search="search">
        <template v-slot:top>
          <v-btn dark class="mb-2" @click="showAddDialog">Add new price list</v-btn>
        </template>
        <template v-slot:item.actions="item">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import PriceListsDialog from "./PriceListsDialog";
export default {
  name: "AppointmentTypeTable",
  components: {
    PriceListsDialog
  },
  data() {
    return {
      search: "",
      headers: [
        { text: "Appointment Type", value: "appointmentType.name" },
        { text: "Price", value: "price" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },

  methods: {
    ...mapActions("priceLists", {
      getPriceListsAction: "getPriceListsAction",
      deletePriceListAction: "deletePriceListAction"
    }),

    ...mapMutations("priceLists", {
      showAddDialog: "openAddDialog",
      showEditDialog: "openEditDialog"
    }),

    editItem(item) {
      this.showEditDialog(item.item);
    },

    deleteItem(item) {
      console.log(item);
      if (confirm("Are you sure you want to delete this price list?")) {
        this.deletePriceListAction(item.item.id);
      }
    }
  },

  async mounted() {
    await this.getPriceListsAction(this.getUser.clinicId);
  },

  computed: {
    ...mapGetters({
      getPriceLists: "priceLists/getPriceLists",
      getAppointmentTypes: "appointmentTypes/getAppointmentTypes",
      getUser: "authentication/getUser",
    })
  }
};
</script>

<style></style>
