<template>
  <div class="matches-index">
    <!-- Mutual Match Data  -->
    <!-- Matches should be sorted by either updated at or Last message  -->
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
      <section id="portfolio" class="col3">
        <div class="container">
          <h1 class="section-title">Matches</h1>

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
                  <button type="button" class="btn btn-outline-danger">
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
        <!-- / container -->
      </section>
    </div>
    <h1>Mutual Matches</h1>

    <p v-if="mutualMatches.length === 0">No matches yet</p>
    <div v-for="mutualMatch in mutualMatches">
      <!-- Router Link redirects to match show -->
      <router-link :to="`/matches/${mutualMatch.id}`"
        ><img :src="`${mutualMatch.matcher.image_url}`" alt=""
      /></router-link>
      <p>
        <strong>{{ mutualMatch.matcher.name }}</strong
        ><br />

        (<i>{{ mutualMatch.matcher.pronouns }}</i
        >) <i>{{ $parent.age(mutualMatch.matcher.birth_date) }}</i>
      </p>
      <p>
        <strong><u>Last Message</u></strong
        >:
      </p>
      <p v-if="mutualMatch.last_message">
        <strong>{{ mutualMatch.last_message.name }}:</strong>
        {{ mutualMatch.last_message.body }}
        <i
          >{{
            $parent.lastMessageSent(mutualMatch.last_message.created_at)
          }}
          hours ago</i
        >
      </p>
      <p>
        <strong><u>Signs</u></strong
        >:
      </p>
      <ul>
        <li>
          Sun: <strong>{{ mutualMatch.matcher.sun_sign }}</strong>
        </li>
        <li>
          Moon: <strong>{{ mutualMatch.matcher.moon_sign }}</strong>
        </li>
        <li>
          Ascendent:
          <strong>{{ mutualMatch.matcher.ascending_sign }}</strong>
        </li>
      </ul>
      <p v-if="mutualMatch.super">Compatibility: <strong>Super</strong></p>
      <p>
        Distance: <strong>{{ mutualMatch.matcher.distance }}</strong>
      </p>
      <p>
        <strong>About:</strong><br />
        {{ mutualMatch.matcher.bio }}
      </p>
      <button v-on:click="unmatch(mutualMatch)">Unmatch</button>
      <br />
      <br />
    </div>

    <!-- Received Matches Data -->
    <!-- Received Matches Should be sort with most recent first-->
    <h1>Received Matches</h1>

    <p v-if="receivedMatches.length === 0">No matches yet</p>

    <div v-for="receivedMatch in receivedMatches">
      <!-- Router Link redirects to match show -->
      <router-link :to="`/matches/${receivedMatch.id}`"
        ><img :src="`${receivedMatch.matcher.image_url}`" alt=""
      /></router-link>
      <p>
        <strong>{{ receivedMatch.matcher.name }}</strong
        ><br />
        (<i>{{ receivedMatch.matcher.pronouns }}</i
        >) <i>{{ $parent.age(receivedMatch.matcher.birth_date) }}</i>
      </p>
      <p>
        <strong><u>Signs</u></strong
        >:
      </p>
      <ul>
        <li>
          Sun: <strong>{{ receivedMatch.matcher.sun_sign }}</strong>
        </li>
        <li>
          Moon: <strong>{{ receivedMatch.matcher.moon_sign }}</strong>
        </li>
        <li>
          Ascendent:
          <strong>{{ receivedMatch.matcher.ascending_sign }}</strong>
        </li>
      </ul>
      <p v-if="receivedMatch.super">Compatibility: <strong>Super</strong></p>
      <p>
        <strong>About:</strong><br />
        {{ receivedMatch.matcher.bio }}
      </p>
      <button v-on:click="rejectMatch(receivedMatch)">
        Reject
      </button>
      <button v-on:click="acceptMatch(receivedMatch)">
        Accept
      </button>
    </div>
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
  },
};
</script>
