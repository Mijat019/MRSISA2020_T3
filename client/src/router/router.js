import Vue from "vue";
import VueRouter from "vue-router";

const MainComponent = () =>
    import(/* webpackChunkName: "mainRoutes" */ "../views/MainComponent");
const Profile = () =>
    import(/* webpackChunkName: "mainRoutes" */ "../components/Profile");
const Register = () =>
    import(/* webpackChunkName: "mainRoutes" */ "../views/Register");
const Login = () =>
    import(/* webpackChunkName: "mainRoutes" */ "../views/Login");
const SetPassword = () =>
    import(/* webpackChunkName: "mainRoutes" */ "../views/SetPassword");

import clinicCenterAdminRoutes from "./clinicCenterAdminRoutes";
import clinicAdminRoutes from "./clinicAdminRoutes";
import nurseRoutes from "./nurseRoutes";
import patientRoutes from "./patientRoutes";
import doctorRoutes from "./doctorRoutes";
import store from "../store/store.js";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component: Login,
        meta: {
            guestRoute: true,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            guestRoute: true,
        },
    },
    {
        path: "/setPassword/:id",
        name: "SetPassword",
        component: SetPassword,
    },
    {
        path: "/clinic",
        component: MainComponent,
        meta: {
            authenticatedRoute: true,
        },
        children: [
            clinicCenterAdminRoutes,
            clinicAdminRoutes,
            doctorRoutes,
            nurseRoutes,
            patientRoutes,
            {
                path: "profile",
                name: "profile",
                component: Profile,
                meta: {
                    authenticatedRoute: true,
                },
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.clinicCenterAdmin)) {
        if (store.getters["authentication/getRole"] == 4) {
            return next();
        } else {
            return next("/clinic");
        }
    } else if (to.matched.some((record) => record.meta.clinicAdmin)) {
        if (store.getters["authentication/getRole"] == 3) {
            return next();
        } else {
            return next("/clinic");
        }
    } else if (to.matched.some((record) => record.meta.nurse)) {
        if (store.getters["authentication/getRole"] == 2) {
            return next();
        } else {
            return next("/clinic");
        }
    } else if (to.matched.some((record) => record.meta.doctor)) {
        if (store.getters["authentication/getRole"] == 1) {
            return next();
        } else {
            return next("/clinic");
        }
    } else if (to.matched.some((record) => record.meta.patient)) {
        if (store.getters["authentication/getRole"] == 0) {
            return next();
        } else {
            return next("/clinic");
        }
    } else if (to.matched.some((record) => record.meta.guestRoute)) {
        if (!store.getters["authentication/isAuthenticated"]) {
            return next();
        } else {
            return next("/clinic");
        }
    } else if (to.matched.some((record) => record.meta.authenticatedRoute)) {
        if (store.getters["authentication/isAuthenticated"]) {
            return next();
        } else {
            return next("/");
        }
    }
    next();
});

export default router;
