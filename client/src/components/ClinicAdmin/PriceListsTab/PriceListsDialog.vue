<template>
  <v-dialog v-model="dialog" width="50%" @click:outside="close">
    <v-card>
      <v-card-title v-if="type === 'add'">Add New Price List</v-card-title>
      <v-card-title v-else>Edit Price List</v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation>
          <v-select
            :items="getAppointmentTypes"
            v-model="priceList.appointmentTypeId"
            item-text="name"
            item-value="id"
            label="Appointment Type"
          />
          <v-text-field v-model="priceList.price" :rules="rules" label="Price" type="number"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close">Cancel</v-btn>
        <v-btn v-if="type === 'add'" color="primary" @click="addType">Add</v-btn>
        <v-btn v-else color="primary" @click="updateType">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "AppointmentTypeDialog",
  data: () => ({
    rules: [v => !!v || "This field is required"],
    addressList: [],
    searchAddress: null,
    isLoading: false
  }),

  methods: {
    ...mapActions("priceLists", {
      addPriceListAction: "addPriceListAction",
      updatePriceListAction: "updatePriceListAction"
    }),

    ...mapMutations("priceLists", {
      close: "closeDialog"
    }),

    async addType() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.priceList.clinicId = this.getUser.clinicId;
      console.log(this.priceList); 
      await this.addPriceListAction(this.priceList);
      this.close();
    },

    async updateType() {
      if (!this.$refs.form.validate()) {
        return;
      }

      this.priceList.clinicId = this.getUser.clinicId;
      await this.updatePriceListAction(this.priceList);
      this.close();
    }
  },

  computed: {
    ...mapGetters({
      dialog: "priceLists/getShowDialog",
      priceList: "priceLists/getDialogpriceList",
      type: "priceLists/getDialogType",
      getAppointmentTypes : "appointmentTypes/getAppointmentTypes",
      getUser: "authentication/getUser",
    })
  }
};
</script>

<style></style>
