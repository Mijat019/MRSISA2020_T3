<template>
  <nav>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    items: [
      {
        title: "Users",
        icon: "mdi-home-city",
        link: "/clinic/clinicCenterAdmin/users",
      },
      {
        title: "Clinics",
        icon: "mdi-account-group-outline",
        link: "/clinic/clinicCenterAdmin/clinics",
      },
      {
        title: "Sifarik",
        icon: "mdi-account",
        link: "/clinic/clinicCenterAdmin/sifarnik",
      },
    ],
    mini: true,
  }),
};
</script>

<style></style>
