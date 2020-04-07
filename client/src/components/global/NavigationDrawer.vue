<template>
  <nav>
    <v-navigation-drawer v-model="drawer" :mini-variant="mini" app dark>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-icon @click.stop="mini=false">mdi-menu</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>{{getFullName}}</v-list-item-title>
        <v-list-item-title>{{getRole}}</v-list-item-title>

        <v-btn icon @click.stop="mini=true">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Every user has a profile option -->
        <v-list-item :to="`/clinic/profile`">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    drawer: true,
    mini: true,
    clinicCenterAdmin: [
      {
        title: "Users",
        icon: "mdi-account-multiple",
        link: "/clinic/clinicCenterAdmin/users"
      },
      {
        title: "Clinics",
        icon: "mdi-home-city",
        link: "/clinic/clinicCenterAdmin/clinics"
      },
      {
        title: "Sifarik",
        icon: "mdi-clipboard",
        link: "/clinic/clinicCenterAdmin/sifarnik"
      }
    ],

    clinicAdmin: [
      {
        title: "Clinic profile",
        icon: "mdi-account-group",
        link: "/clinic/clinicAdmin/clinicProfile"
      }
    ],

    nurse: [
      {
        title: "Appoitnemts",
        icon: "mdi-clipboard-list",
        link: "/clinic/nurse/appointments"
      }
    ],

    doctor: [
      {
        title: "Appoitnemts",
        icon: "mdi-clipboard-list",
        link: "/clinic/doctor/appointments"
      }
    ],

    patient: []
  }),

  computed: {
    ...mapGetters("authentication", {
      getRole: "getRole",
      getFullName: "getFullName"
    }),
    items() {
      const role = this.getRole;
      if (role == 4) {
        return this.clinicCenterAdmin;
      } else if (role == 3) {
        return this.clinicAdmin;
      } else if (role == 2) {
        return this.nurse;
      } else if (role == 1) {
        return this.doctor;
      } else if (role == 0) {
        return this.patient;
      }

      return [];
    }
  }
};
</script>

<style></style>
