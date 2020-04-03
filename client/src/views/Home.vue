<template>
  <div class="home">
    <h1>HOME</h1>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-btn to="/register">Register</v-btn>
      </v-col>
      <v-col>
        <v-btn to="/login">Login</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>
