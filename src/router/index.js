import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import UsersIndex from "../views/UsersIndex.vue";
import UsersShow from "../views/UsersShow.vue";
import UsersEdit from "../views/UsersEdit.vue";
import MatchesIndex from "../views/MatchesIndex.vue";
import MatchesShow from "../views/MatchesShow.vue";


Vue.use(VueRouter);

const routes = [
  { 
    path: "/signup", 
    name: "signup", 
    component: Signup 
  },
  { 
    path: "/", 
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
  },
  { 
    path: "/matches", 
    name: "matches-index", 
    component: MatchesIndex
  },
  { 
    path: "/matches/:id", 
    name: "matches-show", 
    component: MatchesShow
  }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
