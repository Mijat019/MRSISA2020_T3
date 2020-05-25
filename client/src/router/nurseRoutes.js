const NursePage = () =>
    import(/* webpackChunkName: "nurseRoutes" */ "../views/NursePage");
const NurseAppointments = () =>
    import(
        /* webpackChunkName: "nurseRoutes" */ "../components/Nurse/NurseAppointments"
    );

export default {
    path: "nurse",
    name: "NursePage",
    component: NursePage,
    meta: {
        nurse: true,
    },
    children: [
        {
            path: "appointments",
            name: "NurseAppointments",
            component: NurseAppointments,
            meta: {
                nurse: true,
            },
        },
    ],
};
