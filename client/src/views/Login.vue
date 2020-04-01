<template>

  <v-app id="inspire">
    <v-content>

      <v-container class="mt-12 pt-12" fluid>

        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6">

            <v-card class="elevation-12">
              <!-- <v-toolbar color="dark" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar> -->

              <v-card-text>

                <v-row align="center" justify="center">
                  <v-btn icon>
                    <span class="iconify" data-icon="mdi-language-python"/>                
                  </v-btn>
                </v-row>

                <v-form ref="loginForm" lazy-validation>
                  <v-row align="center" justify="center" class="pt-6">
                    <v-col cols="10">
                      <v-text-field
                        v-model="user.username"
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
                    <v-col cols="10">
                      <v-text-field
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
                <a href=""> Create account</a>
                <v-spacer />
                <v-btn @click="submit" dark>Login</v-btn>
              </v-card-actions>

            </v-card>

          </v-col>
        </v-row>

      </v-container>

    </v-content>
  </v-app>

</template>


<script>
export default {
  name: "Login",
  components: {},
  data() {
    return {
      fieldRules: [v => !!v || "This field is required"],
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async submit() {
      if (!this.$refs.loginForm.validate()) {
        return;
      }
      await this.login(this.user);
      this.$router.push("/users");
    }
  }
};
</script>
