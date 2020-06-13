<template>
  <v-card>
    <v-card-title>Who will attend the operation</v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="value">
        <template v-slot:item.actions="{item}">
          <v-btn icon small @click="item">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>

        <template v-slot:top>
          <v-dialog width="40%" v-model="dialog">
            <template v-slot:activator="{on}">
              <v-btn dark class="mb-2" v-on="on">Add doctor</v-btn>
            </template>
            <v-card>
              <v-card-title>Doctor</v-card-title>
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-select
                    :items="doctors"
                    item-text="user.email"
                    return-object
                    v-model="selectedDoctor"
                    placeholder="Doctor"
                  ></v-select>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="addDoctor" color="primary">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'ManageOperationAttanedance',

  props: ['value', 'doctorId', 'start'],

  data: () => ({
    dialog: false,
    selectedDoctor: null,
    headers: [
      { text: 'Full name', value: 'fullName' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),

  computed: {
    ...mapGetters({
      getAvailableDoctors: 'doctors/getAvailableDoctors',
      getUser: 'authentication/getUser',
    }),

    doctors() {
      return this.getAvailableDoctors.filter(
        doctor => doctor.userId !== this.doctorId
      );
    },
  },

  methods: {
    ...mapActions({
      getAvailableDoctorsAction: 'doctors/getAvailableDoctorsAction',
    }),

    addDoctor() {
      if (!this.$refs.form.validate()) {
        return;
      }

      if (this.value.find(el => el.id === this.selectedDoctor.userId)) {
        alert('Doctor already added');
        return;
      }

      this.$emit(`input`, [
        ...this.value,
        {
          id: this.selectedDoctor.userId,
          fullName: `${this.selectedDoctor.user.firstName} ${this.selectedDoctor.user.lastName}`,
        },
      ]);
      this.dialog = false;
      this.selectedDoctor = null;
    },
  },

  created() {
    this.getAvailableDoctorsAction({
      clinicId: this.getUser.clinicId,
      start: this.start,
    });
  },

  watch: {
    start(newValue) {
      this.getAvailableDoctorsAction({
        clinicId: this.getUser.clinicId,
        start: this.start,
      });
    },
  },
};
</script>

<style>
</style>