<template>
  <v-menu bottom origin="center center" :offset-y="true" transition="scale-transition">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" text>
        <v-icon color="white" size="20">mdi-bell</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: 'Click Meeeeeeeeeee' },
      { title: 'Click Meeeeeeeeeee' },
      { title: 'Click Meeeeeeeeeee' },
      { title: 'Click Meeeeeeeeeee 2' },
    ],
  }),
};
</script>

<style></style>
