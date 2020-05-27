const DoctorPage = () =>
    import(/* webpackChunkName: "doctorRoutes" */ "../views/DoctorPage.vue");
const DoctorAppointmentsTabs = () =>
    import(
        /* webpackChunkName: "doctorRoutes" */ "../components/Doctor/DoctorAppointmentsTabs/DoctorAppointmentsTabs.vue"
    );
const DoctorLeaveReqs = () => import("../components/Doctor/LeaveRequests.vue");

export default {
    path: "doctor",
    name: "DoctorPage",
    component: DoctorPage,
    meta: {
        doctor: true,
    },
    children: [
        {
            path: "appointments",
            name: "DoctorAppointmentsTabs",
            component: DoctorAppointmentsTabs,
            meta: {
                doctor: true,
            },
        },
        {
            path: "leaveRequests",
            name: "LeaveRequests",
            component: DoctorLeaveReqs,
            meta: {
                doctor: true,
            },
        }
    ],
};
