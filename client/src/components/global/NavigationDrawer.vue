<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      permanent
      :disable-resize-watcher="true"
      app
      dark
    >
      <v-list-item class="px-2">
        <v-list-item-avatar v-if="mini">
          <v-icon @click.stop="mini = false">mdi-chevron-right</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>{{ getFullName }}</v-list-item-title>

        <v-btn icon @click.stop="mini = true">
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
          class="my-3"
        >
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
      <template v-slot:append>
        <div class="pa-2 ma-2 mb-6">
          <v-btn @click="onLogout" block class="white black--text" :hidden="mini">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data: () => ({
    drawer: true,
    mini: true,
    clinicCenterAdmin: [
      {
        title: 'Administration',
        icon: 'mdi-account-supervisor',
        link: '/clinic/clinicCenterAdmin/administration',
      },
      {
        title: 'Clinics',
        icon: 'mdi-home-city',
        link: '/clinic/clinicCenterAdmin/clinics',
      },
      {
        title: 'Sifarnik',
        icon: 'mdi-clipboard',
        link: '/clinic/clinicCenterAdmin/sifarnik',
      },
    ],

    clinicAdmin: [
      {
        title: 'Clinic profile',
        icon: 'mdi-account-group',
        link: '/clinic/clinicAdmin/clinicProfile',
      },
    ],

    nurse: [
      {
        title: "Appointments",
        icon: "mdi-clipboard-list",
        link: "/clinic/nurse/appointments"
      },
      {
        title: "Leave requests",
        icon: "mdi-history",
        link: "/clinic/nurse/leaveRequests"
      }
    ],

    doctor: [
      {
        title: "Appointments",
        icon: "mdi-clipboard-list",
        link: "/clinic/doctor/appointments"
      },
      {
        title: "Leave requests",
        icon: "mdi-history",
        link: "/clinic/doctor/leaveRequests"
      }
    ],

    patient: [
      {
        title: 'Medical record',
        icon: 'mdi-folder-heart',
        link: '/clinic/patient/medicalRecord',
      },
      {
        title: 'Clinic Center Panel',
        icon: 'mdi-calendar-heart',
        link: '/clinic/patient/cCenterPanel',
      },
    ],
  }),

  methods: {
    ...mapActions('authentication', { logout: 'logout' }),
    ...mapActions({ resetStore: 'resetStore' }),
    onLogout() {
      this.logout();
      this.$router.push('/');
      this.resetStore();
    },
  },

  computed: {
    ...mapGetters('authentication', {
      getRole: 'getRole',
      getFullName: 'getFullName',
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
    },
  },
};
</script>

<style></style>
