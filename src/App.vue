<template>
  <div id="app">
    <!-- wrapper -->
    <div id="wrapper" class="center-sidebar-nav">
      <!-- side navigation -->
      <a id="menu-toggle" class="navbar-toggler collapsed white-bg">
        <span class="icon-bar top-bar"></span>
        <span class="icon-bar middle-bar"></span>
        <span class="icon-bar bottom-bar"></span> </a
      ><!-- / menu-toggle -->

      <!-- Side Bar Menu -->
      <div id="sidebar-wrapper" class="sidebar-nav">
        <ul class="sidebar-nav-inner">
          <li class="sidebar-brand">
            <a><img src="/images/midheaven4.png" alt=""/></a>
          </li>
          <li v-if="isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="/users">COMPATIBLES</router-link>
          </li>
          <li v-if="isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="/matches">MATCHES</router-link>
          </li>
          <li v-if="isLoggedIn()" class="nav-item">
            <router-link class="nav-link" :to="`/users/${getUserId()}`"
              >PROFILE</router-link
            >
          </li>
          <li v-if="!isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="/signup">SIGNUP</router-link>
          </li>
          <li v-if="!isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="/">LOGIN</router-link>
          </li>
          <li v-if="isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="/logout">LOGOUT</router-link>
          </li>

          <li class="sidebar-social">
            <a class="ml-0"><i class="fab fa-facebook-f"></i></a>
            <a><i class="fab fa-twitter"></i></a>
            <a><i class="fab fa-instagram"></i></a>
          </li>
        </ul>

        <!-- / side navigation -->
        <!-- Nav Bar -->
      </div>
      <!-- / side navigation -->
      <div
        v-if="flashMessage"
        class="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        {{ flashMessage }}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <!-- Footer -->

      <router-view :key="$route.path" />
      <footer class="bg-darkgrey dark">
        <div class="container text-center">
          <div class="row vcenter">
            <div class="col-md-8 footer-left-area">
              <p>
                © 2018 <span class="text-regular">MNML</span> BY
                <a href="https://kingstudio.ro" target="_blank">KINGSTUDIO</a>.
              </p>
            </div>
            <div class="col-md-4 social-icons footer-right-area">
              <a href="x"><i class="fab fa-facebook-f"></i></a>
              <a href="x"><i class="fab fa-twitter"></i></a>
              <a href="x"><i class="fab fa-instagram"></i></a>
            </div>
            <!-- / social-icons -->
          </div>
          <!-- / row -->
        </div>
        <!-- / container -->
      </footer>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  data: function() {
    return {
      flashMessage: "",
      mutual: true,
    };
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    getUserId: function() {
      return parseInt(localStorage.getItem("user_id"));
    },
    getUserAge: function() {
      return parseInt(localStorage.getItem("user_age"));
    },
    currentUser: function(user) {
      if (user.id === this.getUserId()) {
        return true;
      }
    },
    age: function(birthDate) {
      return moment().diff(birthDate, "years");
    },
    lastMessageSent: function(createdAt) {
      return moment().diff(createdAt, "hours");
    },
    headerTitle: function(pageTitle) {
      this.pageTitle = pageTitle;
    },
  },
};
</script>
