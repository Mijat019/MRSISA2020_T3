const PatientPage = () =>
    import(/* webpackChunkName: "patientRoutes" */ "../views/PatientPage");
const ClinicCenterPanel = () =>
    import(
        /* webpackChunkName: "patientRoutes" */ "../components/Patient/ClinicCenterPanel/ClinicCenterPanel"
    );
const MedicalRecordTabs = () =>
    import(
        /* webpackChunkName: "patientRoutes" */ "../components/Patient/MedicalRecordTabs/MedicalRecordTabs"
    );

export default {
    path: "patient",
    name: "PatientPage",
    component: PatientPage,
    meta: {
        patient: true,
    },
    children: [
        {
            path: "medicalRecord",
            name: "MedicalRecordTabs",
            component: MedicalRecordTabs,
            meta: { patient: true },
        },
        {
            path: "cCenterPanel",
            name: "ClinicCenterPanel",
            component: ClinicCenterPanel,
            meta: { patient: true },
        },
    ],
};
