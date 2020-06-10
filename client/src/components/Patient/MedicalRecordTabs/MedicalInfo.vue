<template>
  <v-row class="pa-2">
    <v-col>
      <v-card>
        <v-card-title>Medical information</v-card-title>
        <v-card-text>
          <hr />

          <v-list dense>
            <v-list-item
              :key="information.title"
              v-for="information in medicalInformation"
            >
              <v-list-item-avatar>
                <v-icon>{{ information.icon }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ information.title }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  information.subtitle
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'MedicalInfo',

  props: ['user'],

  computed: {
    medicalInformation() {
      return [
        {
          icon: 'mdi-human-male-height',
          title: 'Height',
          subtitle: this.user.medicalRecord.height || 'Not provided',
        },
        {
          icon: 'mdi-weight-kilogram',
          title: 'Weight',
          subtitle: this.user.medicalRecord.weight || 'Not provided',
        },
        {
          icon: 'mdi-blood-bag',
          title: 'Blood type',
          subtitle: this.user.medicalRecord.bloodType || 'Not provided',
        },
      ];
    },
  },
};
</script>

<style></style>
