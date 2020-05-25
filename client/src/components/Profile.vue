<template>
  <v-row class="pa-2">
    <v-col>
      <PersonalInfo :user="getUser" />
    </v-col>
    <v-col>
      <ChangePassword :user="getUser" />
    </v-col>
  </v-row>
</template>

<script>
import PersonalInfo from "./PersonalInfo";
import ChangePassword from "./ChangePassword";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  
  components: {
    PersonalInfo,
    ChangePassword
  },
  
  data: () => ({}),

  computed: {
    ...mapGetters({ getUser: "authentication/getUser" })
  }
};
</script>

<style>
</style>