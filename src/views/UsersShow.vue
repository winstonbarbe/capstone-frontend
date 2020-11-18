<template>
  <div class="users-show">
    <div class="container p-0">
      <!-- Title -->
      <ul
        class="portfolio-filter list-inline text-center filter-bg bg-secondary"
      >
        <h1 v-if="$parent.currentUser(user)">
          My Profile
        </h1>
        <h1 v-if="!$parent.currentUser(user)">
          Compatible
        </h1>
      </ul>
    </div>
    <section id="project-details">
      <div class="container">
        <div class="section-w-image">
          <div class="row vtop">
            <div class="col-lg-7 project-details-image">
              <div v-for="image_url in user.image_urls">
                <img :src="image_url" :alt="user.name" class="mb-3 mt-3" />
              </div>
            </div>
            <div class="col-lg-5 section-description has-sticky-top">
              <div class="sticky-top">
                <h4 class="section-title mb-3">
                  {{ user.name }}
                </h4>
                <!-- <h4 class="section-title mb-3">
                  {{ horoscope }}
                </h4> -->
                <p class="mb-3">
                  <i>({{ user.pronouns }})</i>
                  {{ $parent.age(user.birth_date) }}
                </p>
                <p class="mb-3">
                  {{ user.bio }}
                </p>
                <div class="project-info">
                  <!-- Astrological -->
                  <div class="info">
                    <h6 class="mb-1">Sun</h6>
                    <p>{{ user.sun_sign }}</p>
                  </div>
                  <div class="info">
                    <h6 class="mb-1">Moon</h6>
                    <p>{{ user.moon_sign }}</p>
                  </div>
                  <div class="info">
                    <h6 class="mb-1">Ascending</h6>
                    <p>{{ user.ascending_sign }}</p>
                  </div>
                  <!-- / info -->

                  <!-- If not Current User -->
                  <div v-if="user.ranking > 7" class="info">
                    <h6 class="mb-1">Compatibility</h6>
                    <p>Super</p>
                  </div>
                  <div v-if="user.id != $parent.getUserId()" class="info">
                    <h6 class="mb-1">Distance</h6>
                    <p>{{ user.distance }} Miles Away</p>
                  </div>

                  <!-- If Current User Info -->
                  <div v-if="$parent.currentUser(user)" class="info">
                    <h6 class="mb-1">
                      Email
                    </h6>
                    <p style="text-transform:lowercase;">{{ user.email }}</p>
                  </div>
                  <!-- / info -->

                  <div v-if="$parent.currentUser(user)" class="info">
                    <h6 class="mb-1">Gender</h6>
                    <p>{{ user.gender }}</p>
                  </div>
                  <!-- / info -->

                  <div v-if="$parent.currentUser(user)" class="info">
                    <h6 class="mb-1">Hidden From</h6>
                    <p>{{ hiddenFrom }}</p>
                  </div>
                  <!-- / info -->

                  <div v-if="$parent.currentUser(user)" class="info">
                    <h6 class="mb-1">Interested In</h6>
                    <p>{{ user.interested_in }}</p>
                  </div>
                  <!-- / info -->

                  <!-- Buttons -->

                  <button
                    type="button"
                    class="btn btn-info"
                    v-if="$parent.currentUser(user)"
                    v-on:click="$router.push(`/users/${user.id}/edit`)"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    v-if="!$parent.currentUser(user)"
                    v-on:click="match(user)"
                  >
                    Match
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    v-if="!$parent.currentUser(user)"
                    v-on:click="dismissCompatible(user)"
                  >
                    Dismiss
                  </button>
                  <br />
                  <br />
                  <router-link v-if="!$parent.currentUser(user)" :to="`/users/`"
                    >Back</router-link
                  >

                  <!-- <div class="info social-icons mb-0">
                    <a href="#x"><i class="fab fa-facebook-f mr-3"></i></a>
                    <a href="#x"><i class="fab fa-twitter mr-3"></i></a>
                    <a href="#x"><i class="fab fa-pinterest mr-3"></i></a>
                    <a href="#x"><i class="fab fa-google-plus-g mr-3"></i></a>
                  </div> -->
                  <!-- / info -->
                </div>
                <!-- / project-info -->
              </div>
              <!-- / sticky-top -->
            </div>
            <!-- / section-description -->
          </div>
          <!-- / row -->
        </div>
      </div>
      <!-- / container -->
    </section>
    <!-- / project-details -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      hiddenFrom: "",
      user: {},
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
      if (this.user.seen_by == -1) {
        this.hiddenFrom = "Women";
      } else if (this.user.seen_by == 1) {
        this.hiddenFrom = "Men";
      } else {
        this.hiddenFrom = "No One";
      }
    });

    // this.data = this.data.today;
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
        this.$router.push("/users");
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
        this.$router.push("/users");
      });
    },
  },
  // filters: {
  //   capitalize: function(value) {
  //     if (!value) return "";
  //     value = value.toString();
  //     return value.charAt(0).toUpperCase() + value.slice(1);
  //   },
  // },
};
</script>

<style>
div {
  text-transform: uppercase;
}
</style>
