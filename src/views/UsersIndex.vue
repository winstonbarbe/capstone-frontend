<template>
  <div class="users-index">
    <div class="container p-0">
      <!-- Compatibles filter -->
      <ul
        class="portfolio-filter list-inline text-center filter-bg bg-secondary"
      >
        <!-- Minimum Age Filter -->
        <li class="nav-item dropdown">
          <a aria-haspopup="true" aria-expanded="false">MINUMUM AGE</a>
          <div
            class="dropdown-menu animated fadeIn fast"
            aria-labelledby="dropdown1"
          >
            <div class="row" style="text-align:center;">
              <div class="col-md-12 sub-menu">
                <form method="dialog">
                  <label>SET</label>
                  <select class="form-control" v-model="minAge">
                    <option v-for="age in ages">{{ age }}</option>
                  </select>
                  <br />
                </form>
              </div>
              <!-- / sub-menu -->
            </div>
            <!-- / row -->
          </div>
          <!-- / dropdown-menu -->
        </li>
        <!-- Max Age Filter -->
        <li class="nav-item dropdown">
          <a aria-haspopup="true" aria-expanded="false">MAXIMUM AGE</a>
          <div
            class="dropdown-menu animated fadeIn fast"
            aria-labelledby="dropdown1"
          >
            <div class="row" style="text-align:center;">
              <div class="col-md-12 sub-menu">
                <form method="dialog">
                  <label>SET</label>
                  <select class="form-control" v-model="maxAge">
                    <option v-for="age in ages">{{ age }}</option>
                  </select>
                  <br />
                </form>
              </div>
              <!-- / sub-menu -->
            </div>
            <!-- / row -->
          </div>
          <!-- / dropdown-menu -->
        </li>
        <!-- Max Distance -->
        <!-- Minimum Age Filter -->
        <li class="nav-item dropdown">
          <a aria-haspopup="true" aria-expanded="false">Range</a>
          <div
            class="dropdown-menu animated fadeIn fast"
            aria-labelledby="dropdown1"
          >
            <div class="row" style="text-align:center;">
              <div class="col-md-12 sub-menu">
                <form method="dialog">
                  <label>SET</label>
                  <select class="form-control" v-model="maxDistance">
                    <option v-for="mile in miles">{{ mile }}</option>
                  </select>
                  <br />
                </form>
              </div>
              <!-- / sub-menu -->
            </div>
            <!-- / row -->
          </div>
          <!-- / dropdown-menu -->
        </li>
        <!-- / dropdown -->
      </ul>
      <!-- / Compatibles filter -->
    </div>
    <div id="page-content-wrapper">
      <section id="portfolio" class="no-gutter col3">
        <div class="container">
          <h3 class="section-title hidden">PORTFOLIO</h3>
          <ul class="row portfolio lightbox list-unstyled mb-0" id="grid">
            <!-- project -->
            <li
              v-if="
                $parent.age(user.birth_date) >= minAge &&
                  $parent.age(user.birth_date) <= maxAge &&
                  user.distance <= maxDistance
              "
              v-for="user in users"
              class="col-md-6 col-lg-4 project"
              data-groups='["photography"]'
            >
              <figure class="portfolio-item">
                <router-link :to="`/users/${user.id}`">
                  <div class="hovereffect">
                    <img
                      class="img-responsive"
                      :src="user.image_url"
                      :alt="user.name"
                    />
                    <div class="overlay">
                      <div class="hovereffect-title">
                        <!-- style for a tags aren't working for router links -->

                        <a>
                          <h5 class="project-title">{{ user.name }}</h5>
                          <p class="project-skill">{{ user.bio }}</p> </a
                        ><!-- / project link -->
                      </div>
                      <!-- / hovereffect-title -->
                    </div>
                    <!-- / overlay -->
                  </div>
                </router-link>
                <!-- / hovereffect -->
              </figure>

              <!-- / portfolio-item -->
            </li>
            <!-- / project -->
          </ul>
          <!-- / portfolio -->
        </div>
        <!-- / container -->
      </section>
    </div>

    <!--Horoscope -->
    <!-- <ul id="aztro">
      <li v-for="day in horoscopes">
        <strong>Horoscope</strong>: {{ day.description }}<br />
        <strong>Fucus Point</strong>: {{ day.mood }}
      </li>
    </ul> -->
  </div>
</template>

<style>
ul {
  list-style-type: none;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
import aztroJs from "aztro-js";

export default {
  data: function() {
    return {
      minAge: "",
      maxAge: "",
      maxDistance: 25,
      users: [],
      ages: [],
      miles: [],
      horoscopes: [],
    };
  },
  created: function() {
    axios.get("/api/users").then((response) => {
      console.log(response.data);
      this.users = response.data;
      this.minAge = this.$parent.getUserAge() - 8;
      this.maxAge = this.$parent.getUserAge() + 8;
    });
    axios.get(`/api/users/${this.$parent.getUserId()}`).then((user) => {
      let userSign = user.data.sun_sign;
      aztroJs.getAllHoroscopePromise = function(sign) {
        return new Promise((resolve) => {
          aztroJs.getAllHoroscope(sign, function(data) {
            resolve(data);
          });
        });
      };
      aztroJs.getAllHoroscopePromise(userSign).then((results) => {
        console.log(results);
        this.horoscopes.push(results.today);
        this.horoscopes.push(results.yesterday);
        this.horoscopes.push(results.tomorrow);
      });
    });

    let i = 18;
    while (i < 90) {
      this.ages.push(i);
      i++;
    }
    i = 0;
    while (i < 5000) {
      if (i < 50) {
        i += 5;
      } else if (i < 200) {
        i += 25;
      } else if (i < 500) {
        i += 50;
      } else {
        i = 5000;
      }
      this.miles.push(i);
    }
  },
  methods: {
    match: function(recipient) {
      var superMatch = false;
      if (recipient.ranking > 7) {
        superMatch = true;
      }
      var params = {
        recipient_id: recipient.id,
        mutual: 0,
        super: superMatch,
      };
      axios.post(`/api/matches`, params).then((response) => {
        console.log("Match Created", response.data);
        this.$parent.flashMessage =
          "Match Sent! Go to Matches to see your matches and received matches";
        var index = this.users.indexOf(recipient);
        this.users.splice(index, 1);
      });
    },
    dismissCompatible: function(recipient) {
      var superMatch = false;
      if (recipient.ranking > 7) {
        superMatch = true;
      }
      var params = {
        recipient_id: recipient.id,
        mutual: -1,
        super: superMatch,
      };
      axios.post(`/api/matches`, params).then((response) => {
        console.log("User Dismissed", response.data);
        var index = this.users.indexOf(recipient);
        this.users.splice(index, 1);
      });
    },
  },
};
</script>
