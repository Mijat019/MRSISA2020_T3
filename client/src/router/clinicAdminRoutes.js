const ClinicAdminPage = () =>
    import(
        /* webpackChunkName: "clinicAdminRoutes" */ "../views/ClinicAdminPage.vue"
    );
const ClinicProfile = () =>
    import(
        /* webpackChunkName: "clinicAdminRoutes" */ "../components/ClinicAdmin/ClinicAdminTabs.vue"
    );

export default {
    path: "clinicAdmin",
    name: "ClinicAdminPage",
    component: ClinicAdminPage,
    meta: {
        clinicAdmin: true,
    },
    children: [
        {
            path: "clinicProfile",
            name: "ClinicProfile",
            component: ClinicProfile,
            meta: { clinicAdmin: true },
        },
    ],
};
