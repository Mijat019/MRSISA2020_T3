<template>

  <v-app id="inspire">
    <v-content>

      <v-container class="my-10" fluid>

        <v-row align="center" justify="center">
          <v-col cols="12" sm="8">

            <v-card outlined shaped :loading="loading">

              <v-row class="mx-10">
                <v-col cols="12">
                
                <v-card-title>
                  <v-row align="center" justify="center">
                    <v-btn class="my-4" icon  >
                      <span class="iconify" data-icon="fa-solid:virus"/>                
                    </v-btn>
                  </v-row>
                </v-card-title>

                <v-card-subtitle>
                  <v-row align="center" justify="center">
                    <p class="headline py-4">Register to start using the app</p>
                  </v-row>
                </v-card-subtitle>

              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-row align="center" justify="center" class="pt-3">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="user.firstname"
                        :rules="requiredRule"
                        outlined 
                        dense
                        label="First Name"
                        name="firstname"
                        type="text"
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="user.lastname"
                        :rules="requiredRule"
                        outlined 
                        dense
                        label="Last Name"
                        name="lastname"
                        type="text"
                      />
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="center">
                    <v-col cols="12">
                      <v-text-field
                        v-model="user.email"
                        :rules="emailRule"
                        outlined 
                        dense
                        label="Email"
                        name="email"
                        type="text"
                      />
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="center" class="pt-3">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="user.jmbg"
                        :rules="jmbgRule"
                        outlined 
                        dense
                        label="JMBG"
                        name="jmbg"
                        type="text"
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="user.phoneNum"
                        :rules="phoneNumRule"
                        outlined 
                        dense
                        label="Phone Number"
                        name="phoneNum"
                        type="text"
                      />
                    </v-col>
                  </v-row>

                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="user.password"
                        :rules="requiredRule"
                        outlined 
                        dense
                        id="password1"
                        label="Password"
                        name="password1"
                        type="password"
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="user.confirmed_password"
                        :rules="requiredRule"
                        outlined 
                        dense
                        id="password2"
                        label="Confirm"
                        name="password2"
                        type="password"
                      />
                    </v-col>                 
                  </v-row>

                  <v-row align="center" justify="center">
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="user.country"
                        :rules="requiredRule"
                        outlined 
                        dense
                        label="Country"
                        name="country"
                        type="text"
                      />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="user.city"
                        :rules="requiredRule"
                        outlined 
                        dense
                        label="City"
                        name="city"
                        type="text"
                      />
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="user.address"
                        :rules="requiredRule"
                        outlined 
                        dense
                        label="Address"
                        name="address"
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
import { mapActions } from "vuex";

export default {
  name: "Register",
  components: {},
  data() {
    return {
      loading : false,
      user: {
        firstname : "",
        lastname : "",
        jmbg : "",
        phoneNum : "",
        address : "",
        city : "",
        country : "",
        password: "",
      },
      confirmed_password : "",

      // FORM VALIDATION DATA
      requiredRule : [v => !!v || "This field is required"],
      emailRule : [
        v => !!v || "This field is required",
        // v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      jmbgRule : [
        v => !!v || "This field is required",
        v => !/[a-zA-Z]/.test(v) || "JMBG must not contain letters",
        v => /^[0-9]{13}$/.test(v) || "JMBG must be 13 digits long"
      ],
      phoneNumRule : [
        v => !!v || "This field is required",
        v => !/[a-zA-Z]/.test(v) || "Phone number must not contain letters",
        v => /^[0-9]{10}$/.test(v) || "Phone number must be 10 digits long"
      ],
      // END OF FORM VALIDATION

    };
  },
  methods: {

    ...mapActions({
      register: "authentication/register",
    }),

    async submit() {
    
      if (!this.$refs.form.validate()) {
        return;
      }

      this.loading = true
      await setTimeout(() => (this.loading = false), 2000)

      await this.register(this.user);
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
    width: 60px; 
    height: 60px; 
  }



</style>