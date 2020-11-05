import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersIndex from "../views/UsersIndex.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";


Vue.use(VueRouter);

const routes = [
  { 
    path: "/", 
    name: "home", 
    component: Home 
  },
  { 
    path: "/signup", 
    name: "signup", 
    component: Signup 
  },
  { 
    path: "/login", 
    name: "login", 
    component: Login 
  },
  { 
    path: "/logout", 
    name: "logout", 
    component: Logout 
  },
  { 
    path: "/users", 
    name: "user-index", 
    component: UsersIndex 
  },
  { 
    path: "/users/:id", 
    name: "user-show", 
    component: UsersShow 
  },
  { 
    path: "/users/:id/edit", 
    name: "users-edit", 
    component: UsersEdit
  }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
