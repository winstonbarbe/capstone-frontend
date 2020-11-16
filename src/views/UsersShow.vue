<template>
  <div class="users-show">
    <section id="project-details">
      <div class="container">
        <div class="section-w-image">
          <div class="row vtop">
            <div class="col-lg-7 project-details-image">
              <div>
                <img :src="user.image_url" :alt="user.name" class="mb-3 mt-3" />
              </div>
            </div>
            <div class="col-lg-5 section-description has-sticky-top">
              <div class="sticky-top">
                <h4 class="section-title mb-3">
                  {{ user.name }}
                  <!-- ({{
                    user.pronouns | capitalize
                  }}) -->
                </h4>
                <p class="mb-3">
                  {{ user.bio }}
                </p>
                <div class="project-info">
                  <div class="info">
                    <h6 class="mb-1">Signs</h6>
                    <p>KingStudio</p>
                  </div>
                  <!-- / info -->

                  <div class="info">
                    <h6 class="mb-1">SKILLS</h6>
                    <p>Photography</p>
                  </div>
                  <!-- / info -->

                  <div class="info">
                    <h6 class="mb-1">DELIVERED</h6>
                    <p>27 Sep 2018</p>
                  </div>
                  <!-- / info -->

                  <div class="info">
                    <h6 class="mb-1">WEBSITE</h6>
                    <p>
                      <a href="#x" class="project-info-link"
                        >www.kingstudio.ro</a
                      >
                    </p>
                  </div>
                  <!-- / info -->

                  <div class="info social-icons mb-0">
                    <a href="#x"><i class="fab fa-facebook-f mr-3"></i></a>
                    <a href="#x"><i class="fab fa-twitter mr-3"></i></a>
                    <a href="#x"><i class="fab fa-pinterest mr-3"></i></a>
                    <a href="#x"><i class="fab fa-google-plus-g mr-3"></i></a>
                  </div>
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
    <img :src="user.image_url" :alt="user.name" />

    <h1>
      {{ user.name }}
    </h1>
    <!-- For age add moment js -->
    <p>
      (<i>{{ user.pronouns }}</i
      >) <i>{{ $parent.age(user.birth_date) }}</i>
    </p>
    <p v-if="user.ranking > 7">Compatibility: <strong>Super</strong></p>
    <p>
      <strong><u>Signs</u></strong
      >:
    </p>
    <ul>
      <li>
        Sun: <strong>{{ user.sun_sign }}</strong>
      </li>
      <li>
        Moon: <strong>{{ user.moon_sign }}</strong>
      </li>
      <li>
        Ascendent: <strong>{{ user.ascending_sign }}</strong>
      </li>
    </ul>
    <p v-if="user.ranking > 7">Compatibility: <strong>Super</strong></p>
    <p v-if="user.id != $parent.getUserId()">
      Distance: <strong>{{ user.distance }}</strong>
    </p>
    <p>
      <strong>About:</strong><br />
      {{ user.bio }}
    </p>
    <!-- Account info for current user -->
    <p v-if="$parent.currentUser(user)"><strong>Account Info</strong></p>
    <p v-if="$parent.currentUser(user)">Email: {{ user.email }}</p>
    <p v-if="$parent.currentUser(user)">Gender: {{ user.gender }}</p>
    <p v-if="$parent.currentUser(user)">Hidden From: {{ hiddenFrom }}</p>
    <p v-if="$parent.currentUser(user)">
      Interested In: {{ user.interested_in }}
    </p>
    <router-link v-if="$parent.currentUser(user)" :to="`/users/${user.id}/edit`"
      >Edit</router-link
    >
    <button v-if="!$parent.currentUser(user)" v-on:click="match(user)">
      Match
    </button>
    <button
      v-if="!$parent.currentUser(user)"
      v-on:click="dismissCompatible(user)"
    >
      Dismiss
    </button>
    <button
      v-if="!$parent.currentUser(user)"
      v-on:click="$router.push(`/users`)"
    >
      Back
    </button>
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
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
};
</script>
