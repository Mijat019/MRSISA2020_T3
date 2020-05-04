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

    <v-data-table :headers="headers" :items="getNurses" :search="search">
      <template v-slot:top>
        <slot name="top"></slot>
      </template>
      <template v-slot:item.actions="{item}">
        <slot name="actions" :nurseId="item.userId"></slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "NursesTable",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "First name",
          value: "user.firstName"
        },
        {
          text: "Last name",
          value: "user.lastName"
        },
        {
          text: "City",
          value: "user.city"
        },
        { text: "Actions", value: "actions", sortable: false }
      ]
    };
  },

  methods: {
    ...mapActions("nurses", {
      getNursesAction: "getNursesAction"
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