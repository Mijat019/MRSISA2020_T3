const ManageClinics = () =>
    import(
        /* webpackChunkName: "clinicCenterAdminRoutes" */ "../components/ClinicCenterAdmin/Clinics/ManageClinics.vue"
    );
const SifarnikTabs = () =>
    import(
        /* webpackChunkName: "clinicCenterAdminRoutes" */ "../components/ClinicCenterAdmin/SifarnikTabs/SifarnikTabs.vue"
    );
const AdministrationTabs = () =>
    import(
        /* webpackChunkName: "clinicCenterAdminRoutes" */ "../components/ClinicCenterAdmin/AdministationTabs/AdministrationTabs.vue"
    );
const ClinicCenterAdminPage = () =>
    import(
        /* webpackChunkName: "clinicCenterAdminRoutes" */ "../views/ClinicCenterAdminPage.vue"
    );
export default {
    path: "clinicCenterAdmin",
    name: "ClinicCenterAdminPage",
    component: ClinicCenterAdminPage,
    meta: {
        clinicCenterAdmin: true,
    },

    children: [
        {
            path: "administration",
            name: "AdministrationTabs",
            component: AdministrationTabs,
            meta: {
                clinicCenterAdmin: true,
            },
        },
        {
            path: "sifarnik",
            name: "SifarnikTabs",
            component: SifarnikTabs,
            meta: {
                clinicCenterAdmin: true,
            },
        },
        {
            path: "clinics",
            name: "Clinics",
            component: ManageClinics,
            meta: {
                clinicCenterAdmin: true,
            },
        },
    ],
};
