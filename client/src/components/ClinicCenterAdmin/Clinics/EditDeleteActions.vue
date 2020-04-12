<template>
  <div>
    <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
  </div>
</template>

<script>
export default {
  name: "EditDeleteActions",
  data: () => ({}),
  props: ["item"],
  methods: {
    editItem(item) {
      alert(item);
    },
    deleteItem(item) {
      alert(item);
    }
  }
};
</script>

<style>
</style>