<template>
  <v-card>
    <v-card-title>Change Password</v-card-title>
    <v-card-text>
      <hr />
      <v-list dense>
        <v-form v-model="formValid">
          <v-list-item>
            <v-list-item-content>
              <v-text-field label="Password" type="password" v-model="pass" :rules="passRules"></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-text-field label="Confirm password" type="password" v-model="confPass" :rules="confPassRules"></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-form>

        <v-list-item v-if="formValid">
            <v-list-item-content>
              <v-btn @click="changePass" color="primary" max-width="70">Save</v-btn>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
    
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ChangePassword",
  
  data() {
    return {
      pass: null,
      confPass: null,
      passRules: [
        value => !!value || "Required"
      ],
      confPassRules: [
        value => !!value || "Required",
        this.passMatch
      ],
      formValid: false
    }
  },

  methods: {
    ...mapActions({ changeAction: "authentication/changePasswordAction" }),

    passMatch() {
      return this.pass === this.confPass || "Passwords must match";
    },

    changePass() {
      this.changeAction({
        id: this.user.id,
        password: this.pass
      });
    }
  },

  computed: {
    ...mapGetters({ user: "authentication/getUser" })
  }
};
</script>

<style>
</style>