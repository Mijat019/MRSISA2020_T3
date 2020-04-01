<template>

  <v-app id="inspire">
    <v-content>

      <v-container class="mt-10" fluid>

        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">

            <v-card outlined shaped :loading="loading">

              <v-row class="mx-10">
                <v-col cols="12">
                
                <v-card-title>
                  <v-row align="center" justify="center">
                    <v-btn class="my-4" icon  >
                      <span class="iconify" data-icon="mdi-language-python"/>                
                    </v-btn>
                  </v-row>
                </v-card-title>

                <v-card-subtitle>
                  <v-row align="center" justify="center">
                    <p class="headline py-4">Sign in to use app</p>
                  </v-row>
                </v-card-subtitle>

              <v-card-text>
                <v-form ref="loginForm" lazy-validation>
                  <v-row align="center" justify="center" class="pt-3">
                    <v-col cols="6">
                      <v-text-field
                        v-model="user.firstname"
                        :rules="fieldRules"
                        outlined 
                        dense
                        label="First Name"
                        name="login"
                        type="text"
                      />
                    </v-col>

                    <v-col cols="6">
                      <v-text-field
                        v-model="user.lastname"
                        :rules="fieldRules"
                        outlined 
                        dense
                        label="Last Name"
                        name="login"
                        type="text"
                      />
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="center">
                    <v-col cols="12">
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

                  <v-row align="center" justify="center" class="pt-3">
                    <v-col cols="6">
                      <v-text-field
                        v-model="user.firstname"
                        :rules="fieldRules"
                        outlined 
                        dense
                        label="JMBG"
                        name="login"
                        type="text"
                      />
                    </v-col>

                    <v-col cols="6">
                      <v-text-field
                        v-model="user.lastname"
                        :rules="fieldRules"
                        outlined 
                        dense
                        label="Phone Number"
                        name="login"
                        type="text"
                      />
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="center">
                    <v-col cols="6">
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

                    <v-col cols="6">
                      <v-text-field
                        v-model="user.password"
                        :rules="fieldRules"
                        outlined 
                        dense
                        id="password"
                        label="Confirm"
                        name="password"
                        type="password"
                      />
                    </v-col>                 
                  </v-row>

                  <v-row align="center" justify="center">
                    <v-col cols="4">
                      <v-text-field
                        v-model="user.firstname"
                        :rules="fieldRules"
                        outlined 
                        dense
                        label="Country"
                        name="login"
                        type="text"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="user.firstname"
                        :rules="fieldRules"
                        outlined 
                        dense
                        label="City"
                        name="login"
                        type="text"
                      />
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="user.firstname"
                        :rules="fieldRules"
                        outlined 
                        dense
                        label="Address"
                        name="login"
                        type="text"
                      />
                    </v-col>                    
                  </v-row>                 
                </v-form>
              </v-card-text>


              <v-card-actions>
                  <router-link to="/login" class="ml-2">
                    <a href=""> Sign in instead</a>
                  </router-link>
                  <v-spacer />
                  <v-btn @click="submit" class="blue white--text mr-2">Register</v-btn>
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
export default {
  name: "Register",
  components: {},
  data() {
    return {
      loading : false,
      fieldRules: [v => !!v || "This field is required"],
      user: {
        firstname : "",
        lastname : "",
        jmbg : "",
        username : "",
        address : "",
        city : "",
        country : "",
        password1: "",
        password12 : ""
      }
    };
  },
  methods: {
    async submit() {
    
      if (!this.$refs.loginForm.validate()) {
        return;
      }

      this.loading = true
      await setTimeout(() => (this.loading = false), 2000)

      // await this.login(this.user);
      this.$router.push("/");
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
  }



</style>