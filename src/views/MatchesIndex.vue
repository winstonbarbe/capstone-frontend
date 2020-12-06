<template>
  <div class="matches-index">
    <!-- Mutual Match Data  -->
    <!-- Matches should be sorted by either updated at or Last message  -->
    <div class="container p-0">
      <!-- Compatibles filter -->
      <ul
        class="portfolio-filter list-inline text-center filter-bg bg-secondary"
      >
        <h1>MATCHES</h1>
        <!-- Minimum Age Filter -->
        <li class="nav-item dropdown">
          <button
            v-on:click="isMutual('mutual')"
            type="button"
            class="btn btn-secondary"
          >
            MUTUAL
          </button>
        </li>
        <li>-</li>
        <li class="nav-item dropdown">
          <button
            v-on:click="isMutual('received')"
            type="button"
            class="btn btn-secondary"
          >
            RECEIVED
          </button>
        </li>
      </ul>
      <!-- / Compatibles filter -->
    </div>

    <!-- Matches -->
    <div id="page-content-wrapper">
      <section id="portfolio" class="col3">
        <!-- Start Mutual Matches -->
        <div v-if="$parent.mutual" class="container">
          <h1 class="section-title">Mutual Matches</h1>
          <p v-if="mutualMatches.length === 0">No mutual matches yet</p>

          <div class="row">
            <div v-for="match in mutualMatches" class="col-lg-4">
              <div class="blog block">
                <div class="post-image">
                  <router-link :to="`/matches/${match.id}`">
                    <div class="hovereffect">
                      <img
                        class="img-responsive"
                        :src="match.matcher.image_url"
                        :alt="match.matcher.name"
                      />
                      <div class="overlay">
                        <div class="hovereffect-title">
                          <!-- style for a tags aren't working for router links -->

                          <a>
                            <h5 class="project-title">
                              {{ match.matcher.name }}
                            </h5>
                            <p
                              v-if="match.matcher.ranking > 7"
                              class="project-skill"
                            >
                              Super Compatible
                            </p>
                            <p v-else class="project-skill">
                              {{ match.matcher.sun_sign }} -
                              {{ match.matcher.moon_sign }} -
                              {{ match.matcher.ascending_sign }}
                            </p> </a
                          ><!-- / project link -->
                        </div>
                        <!-- / hovereffect-title -->
                      </div>
                      <!-- / overlay -->
                    </div>
                  </router-link>
                </div>
                <!-- / post-image -->
                <div class="post-content bg-secondary">
                  <h4 class="post-title">
                    {{ match.matcher.name }}
                    <a>{{ $parent.age(match.matcher.birth_date) }}</a
                    ><br />
                    <a
                      ><i>({{ match.matcher.pronouns }})</i> -
                      {{ match.matcher.distance }} Miles away
                    </a>
                    <a class="text-sm"
                      >{{ match.matcher.sun_sign }} -
                      {{ match.matcher.moon_sign }} -
                      {{ match.matcher.ascending_sign }}</a
                    >
                  </h4>
                  <p class="mb-3">
                    {{ match.matcher.bio }}
                  </p>
                  <h6 v-if="match.last_message" class="post-title">
                    <a class="text-primary">Last Message</a><br />
                    <a class="text-sm">{{ match.last_message.body }}</a
                    ><br />
                    <a class="text-xs"
                      >{{ match.last_message.name }} -
                      {{
                        $parent.lastMessageSent(match.last_message.created_at)
                      }}
                      <i>hours ago</i><br
                    /></a>
                  </h6>
                  <button
                    v-on:click="unmatch(match)"
                    type="button"
                    class="btn btn-outline-danger"
                  >
                    UNMATCH
                  </button>
                </div>
                <!-- / post-content -->
              </div>
              <!-- / blog-block -->
            </div>
            <!-- / column -->
          </div>
          <!-- / row -->
          <!-- / portfolio -->
        </div>
        <!-- End Mutual Matches -->

        <!-- Start Received Matches -->
        <div v-if="!$parent.mutual" class="container">
          <h1 class="section-title">Received Matches</h1>
          <p v-if="receivedMatches.length === 0">No received matches yet</p>
          <div class="row">
            <div v-for="match in receivedMatches" class="col-lg-4">
              <div class="blog block">
                <div class="post-image">
                  <router-link :to="`/matches/${match.id}`">
                    <div class="hovereffect">
                      <img
                        class="img-responsive"
                        :src="match.matcher.image_url"
                        :alt="match.matcher.name"
                      />
                      <div class="overlay">
                        <div class="hovereffect-title">
                          <!-- style for a tags aren't working for router links -->

                          <a>
                            <h5 class="project-title">
                              {{ match.matcher.name }}
                            </h5>
                            <p
                              v-if="match.matcher.ranking > 7"
                              class="project-skill"
                            >
                              Super Compatible
                            </p>
                            <p v-else class="project-skill">
                              {{ match.matcher.sun_sign }} -
                              {{ match.matcher.moon_sign }} -
                              {{ match.matcher.ascending_sign }}
                            </p> </a
                          ><!-- / project link -->
                        </div>
                        <!-- / hovereffect-title -->
                      </div>
                      <!-- / overlay -->
                    </div>
                  </router-link>
                </div>
                <!-- / post-image -->
                <div class="post-content bg-secondary">
                  <h4 class="post-title">
                    {{ match.matcher.name }}
                    <a>{{ $parent.age(match.matcher.birth_date) }}</a
                    ><br />
                    <a
                      ><i>({{ match.matcher.pronouns }})</i> -
                      {{ match.matcher.distance }} Miles away
                    </a>
                    <a class="text-sm"
                      >{{ match.matcher.sun_sign }} -
                      {{ match.matcher.moon_sign }} -
                      {{ match.matcher.ascending_sign }}</a
                    >
                  </h4>
                  <p class="mb-3">
                    {{ match.matcher.bio }}
                  </p>
                  <br />
                  <button
                    type="button"
                    class="btn btn-outline-success"
                    v-on:click="acceptMatch(match)"
                  >
                    Accept
                  </button>
                  <span> - </span>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    v-on:click="rejectMatch(match)"
                  >
                    Reject
                  </button>
                </div>
                <!-- / post-content -->
              </div>
              <!-- / blog-block -->
            </div>
            <!-- / column -->
          </div>
          <!-- / row -->
          <!-- / portfolio -->
        </div>
        <!-- End Received Matches -->
        <!-- / container -->
      </section>
    </div>
    <!-- End Matches -->
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      errors: [],
      mutualMatches: [],
      receivedMatches: [],
    };
  },
  created: function() {
    axios.get(`/api/matches`).then((response) => {
      console.log(response.data);
      this.receivedMatches = response.data.received_matches;
      this.mutualMatches = response.data.mutual_matches;
    });
  },
  methods: {
    unmatch: function(match) {
      var params = {
        mutual: -1,
      };
      axios
        .patch(`/api/matches/${match.id}`, params)
        .then((response) => {
          console.log("Unmatched", response.data);
          var index = this.mutualMatches.indexOf(match);
          this.mutualMatches.splice(index, 1);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    acceptMatch: function(match) {
      var params = {
        mutual: 1,
      };
      axios
        .patch(`/api/matches/${match.id}`, params)
        .then((response) => {
          console.log("Match Accepted", response.data);
          var index = this.receivedMatches.indexOf(match);
          this.receivedMatches.splice(index, 1);
          this.mutualMatches.push(response.data);
          this.matches = this.mutualMatches;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    rejectMatch: function(match) {
      var params = {
        mutual: -1,
      };
      axios
        .patch(`/api/matches/${match.id}`, params)
        .then((response) => {
          console.log("Match Rejected", response.data);
          var index = this.receivedMatches.indexOf(match);
          this.receivedMatches.splice(index, 1);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    isMutual: function(type) {
      if (type === "mutual") {
        this.$parent.mutual = true;
      } else if (type) {
        this.$parent.mutual = false;
      }
    },
  },
};
</script>
