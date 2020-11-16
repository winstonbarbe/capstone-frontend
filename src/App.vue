<template>
  <div id="app">
    <!-- Nav Bar -->
    <nav class="navbar custom-menu navbar-expand-lg navbar-light bg-white">
      <div class="container">
        <a class="navbar-brand" href="index.html"
          ><img src="/images/logo.png" alt=""
        /></a>
        <button
          class="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-toggle"
          aria-controls="navbar-toggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="icon-bar top-bar"></span>
          <span class="icon-bar middle-bar"></span>
          <span class="icon-bar bottom-bar"></span>
          <span class="sr-only">Toggle navigation</span></button
        ><!-- / navbar-toggler -->

        <div class="collapse navbar-collapse" id="navbar-toggle">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">HOME</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/users"
                >COMPATIBLES</router-link
              >
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
              <router-link class="nav-link" to="/login">LOGIN</router-link>
            </li>
            <li v-if="isLoggedIn()" class="nav-item">
              <router-link class="nav-link" to="/logout">LOGOUT</router-link>
            </li>
          </ul>
          <!-- / navbar-nav -->
        </div>
        <!-- / navbar-collapse -->
      </div>
      <!-- / container -->
    </nav>
    <!-- / navbar-light -->
    <header class="page-header agency-page bg-white">
      <div class="container">
        <div class="header-content">
          <h1>Page Name</h1>
        </div>
      </div>
      <!-- / container -->
    </header>

    <!-- Footer -->

    <router-view />
    <footer class="big bg-darkgrey dark">
      <div class="container text-center">
        <div class="row vcenter">
          <div class="col-md-8 footer-left-area">
            <p>
              © 2018 <span class="text-regular">MNML</span> BY
              <a href="https://kingstudio.ro" target="_blank">KINGSTUDIO</a>.
            </p>
          </div>
          <div class="col-md-4 social-icons footer-right-area">
            <a href="#x"><i class="fab fa-facebook-f"></i></a>
            <a href="#x"><i class="fab fa-twitter"></i></a>
            <a href="#x"><i class="fab fa-instagram"></i></a>
          </div>
          <!-- / social-icons -->
        </div>
        <!-- / row -->
      </div>
      <!-- / container -->
    </footer>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
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
