<template>
  <div>
    <v-card>
        <v-card-title>Basic information</v-card-title>
        <v-card-text>
            <v-form v-model="formValid">
                <v-list dense max-width="50%">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-bank</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Clinic name</v-list-item-title>
                            <v-text-field :rules="rules" v-model="myClinic.name"></v-text-field>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Description</v-list-item-title>
                            <v-textarea :rules="rules" v-model="myClinic.description"></v-textarea>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-map-marker</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Address</v-list-item-title>
                            <v-text-field :rules="rules" v-model="myClinic.address"></v-text-field>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-map</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Map</v-list-item-title>
                            <div style="height: 100px; background-color: grey;">[Staviti mapu ovde]</div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-form>
        </v-card-text>

        <v-card-actions v-if="formValid">
            <v-btn color="primary" width="200" height="50" @click="saveClinic()">save</v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "BasicInfo",

    data() {
        return {
            formValid: false,
            rules: [
                v => !!v || 'Required'
            ]
        }
    },
  methods: {
      ...mapActions({
          getMyClinicAction: "clinicAdmins/getMyClinicAction",
          updateClinicAction: "clinics/updateClinicAction"
      }),

      saveClinic() {
          if (this.formValid) {
              this.updateClinicAction(this.myClinic);
          }
      }
  },

  mounted() {
      this.getMyClinicAction();
  },

  computed: {
      ...mapGetters({
          myClinic: "clinicAdmins/getMyClinic"
      })
  }
};
</script>

<style></style>
