<template>
  <div class="matches-index">
    <!-- Mutual Match Data  -->
    <!-- Matches should be sorted by either updated at or Last message  -->
    <h1>Mutual Matches</h1>

    <p v-if="mutualMatches.length === 0">No matches yet</p>
    <div v-for="mutualMatch in mutualMatches">
      <!-- Router Link redirects to match show -->
      <router-link :to="`/matches/${mutualMatch.id}`"
        ><img :src="`${mutualMatch.matcher.image_url}`" alt=""
      /></router-link>
      <p>
        <strong>{{ mutualMatch.matcher.first_name }}</strong
        ><br />

        (<i>{{ mutualMatch.matcher.pronouns }}</i
        >) <i>{{ $parent.age(mutualMatch.matcher.birth_date) }}</i>
      </p>
      <p>
        <strong><u>Last Message</u></strong
        >:
      </p>
      <p v-if="mutualMatch.last_message">
        <strong>{{ mutualMatch.last_message.sender.first_name }}:</strong>
        {{ mutualMatch.last_message.body }}
        <i
          >{{ $parent.lastMessageSent(mutualMatch.last_message.sent) }} hours
          ago</i
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
        <strong>{{ receivedMatch.matcher.first_name }}</strong
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
