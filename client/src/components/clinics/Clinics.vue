<template>
    <ClinicsTable>
        <template v-slot:addClinic>
            <AddClinic />
        </template>
    </ClinicsTable>
</template>

<script>
import AddClinic from "./AddClinic";
import ClinicsTable from "./ClinicsTable";
export default {
    name: "Clinics",
    components: {
        AddClinic,
        ClinicsTable
    }
};
</script>

<style></style>
