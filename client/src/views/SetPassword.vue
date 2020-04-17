<template>
  <v-app>
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
                      <p class="headline py-4">Set your password</p>
                    </v-row>
                  </v-card-subtitle>

                  <v-card-text>
                    <v-form ref="form" lazy-validation>
                      <v-text-field
                        v-model="password"
                        :rules="requiredRule"
                        outlined
                        dense
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                      />
                      <v-text-field
                        v-model="confirmedPassword"
                        :rules="passwordRule"
                        outlined
                        dense
                        id="password2"
                        label="Confirm"
                        name="password2"
                        type="password"
                      />
                    </v-form>
                  </v-card-text>

                  <v-card-actions>
                    <v-btn @click="submit" class="blue white--text mr-2">Set password</v-btn>
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
  name: "SetPassword",
  data() {
    return {
      loading: false,
      password: "",
      confirmedPassword: "",
      requiredRule: [v => !!v || "This field is required"],
      passwordRule: [
        v => !!v || "This field is required",
        v => v === this.password || "Passwords must match!"
      ]
    };
  },
  methods: {
    ...mapActions("authentication", { setPasswordAction: "setPasswordAction" }),
    async submit() {
      this.loading = true;
      if (!this.$refs.form.validate()) {
        return;
      }

      await this.setPasswordAction({
        password: this.password,
        id: this.$route.params.id
      });
      this.loading = false;
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>