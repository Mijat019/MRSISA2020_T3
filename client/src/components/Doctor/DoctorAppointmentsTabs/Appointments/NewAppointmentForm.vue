<template>
  <div>
    <v-form>
      <v-select item-text="name" item-value="id" label="Room" :items="getRooms"></v-select>
      <v-select
        item-text="appoType.name"
        item-value="appoType.priceList.id"
        label="Appointment type"
        :items="getPriceListsForDoctor"
      ></v-select>
    </v-form>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary">Schedule</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NewAppointmentForm",

  methods: {
    ...mapActions({
      getRoomsAction: "rooms/getRoomsAction",
      getPriceListsForDoctorAction: "priceLists/getPriceListsForDoctorAction"
    })
  },

  computed: {
    ...mapGetters({
      getPriceListsForDoctor: "priceLists/getPriceListsForDoctor",
      getRooms: "rooms/getRooms",
      getUser: "authentication/getUser"
    })
  },

  created() {
    this.getPriceListsForDoctorAction(this.getUser.id);
    this.getRoomsAction(this.getUser.clinicId);
  }
};
</script>

<style>
</style>