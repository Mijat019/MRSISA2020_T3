<template>
  <v-form ref="form" class="mt-5 mx-8" lazy-validation>
    <v-text-field
      :value="name"
      readonly
      label="Clinic"
      prepend-inner-icon="mdi-hospital-building"
      outlined
    ></v-text-field>

    <v-text-field
      label="Appointment Type"
      :value="type"
      prepend-inner-icon="mdi-language-typescript"
      readonly
      outlined
    ></v-text-field>

    <v-text-field
      label="Price"
      :value="price"
      readonly
      outlined
      prepend-inner-icon="mdi-currency-usd"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  props: ['name', 'type', 'price']
};
</script>

<style></style>
