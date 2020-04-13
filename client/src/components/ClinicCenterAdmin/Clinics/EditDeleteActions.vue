<template>
  <div>
    <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "EditDeleteActions",
  data: () => ({}),
  props: ["item"],
  methods: {
    ...mapActions("clinics", { deleteClinicAction: "deleteClinicAction" }),
    editItem(item) {
      item;
      alert("Not implemented");
    },
    async deleteItem({ item }) {
      await this.deleteClinicAction(item.id);
    }
  }
};
</script>

<style>
</style>