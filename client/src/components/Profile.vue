<template>
  <PersonalInfo :user="getUser" />
</template>

<script>
import PersonalInfo from "./PersonalInfo";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  
  components: {
    PersonalInfo
  },
  
  data: () => ({}),

  computed: {
    ...mapGetters({ getUser: "authentication/getUser" })
  }
};
</script>

<style>
</style>