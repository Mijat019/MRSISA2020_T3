<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="my-12 py-12" fluid>
        <v-row align="center" justify="center">
          <v-col cols="10" sm="8" lg="6" xl="4">
            <v-card outlined shaped :loading="loading">
              <v-row class="mx-10">
                <v-col cols="12">
                  <v-card-title>
                    <v-row align="center" justify="center">
                      <div class="mt-3">
                        <span class="iconify" data-icon="fa-solid:virus" />
                      </div>
                    </v-row>
                  </v-card-title>

                  <v-card-subtitle>
                    <v-row align="center" justify="center">
                      <p class="headline py-4">Sign in to access your profile</p>
                    </v-row>
                  </v-card-subtitle>

                  <v-card-text>
                    <v-form ref="loginForm" lazy-validation>
                      <v-row align="center" justify="center" class="pt-6">
                        <v-col cols="12">
                          <v-text-field
                            v-model="user.email"
                            @keyup.enter="submit"
                            :rules="fieldRules"
                            outlined
                            dense
                            label="Email"
                            name="login"
                            type="text"
                          />
                        </v-col>
                      </v-row>

                      <v-row align="center" justify="center">
                        <v-col cols="12">
                          <v-text-field
                            @keyup.enter="submit"
                            v-model="user.password"
                            :rules="fieldRules"
                            outlined
                            dense
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                          />
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn :to="`/register`" text class="white blue--text ml-2">Create Account</v-btn>
                    <v-spacer />
                    <v-btn @click="submit" class="blue white--text mr-2">Sign in</v-btn>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      loading: false,
      fieldRules: [v => !!v || "This field is required"],
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({
      login: "authentication/login"
    }),

    async submit() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }

      this.loading = true;
      await this.login(this.user);
      this.loading = false;
      this.$router.push("/clinic");
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.iconify {
  width: 50px;
  height: 50px;
  color: grey;
}
</style>
