<template>
  <div>
    <BusinessReport/>
    <hr/>
    <IncomeReport/>
  </div>
</template>

<script>
import IncomeReport from "./IncomeReport";
import BusinessReport from "./BusinessReport";
export default {
    name: "Report",

    components: {
        IncomeReport,
        BusinessReport
    },

    data() {
        return {

        }
    },

    methods: {

    },

    mounted() {

    },

    computed: {

    }
};
</script>

<style></style>
