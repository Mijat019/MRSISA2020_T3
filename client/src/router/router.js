import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register";
import Login from "../views/Login";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue")
    },
    {
        path: "/manageClinics",
        name: "ManageClinics",
        component: () =>
            import(
                /* webpackChunkName: "ManageClinics" */ "../components/clinics/Clinics"
            )
    },
    {
        path: "/manageDoctors",
        name: "ManageDoctors",
        component: () =>
            import(
                "../components/doctors/Doctors"
            )
    },
    {
        path: "/manageNurses",
        name: "ManageNurses",
        component: () =>
            import(
                "../components/nurses/Nurses"
            )
    }
];


const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
