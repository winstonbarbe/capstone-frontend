<template>
  <div class="matches-index">
    <!-- Mutual Match Data  -->
    <!-- Matches should be sorted by either updated at or Last message  -->
    <h1>Mutual Matches</h1>
    <p v-if="mutualMatches.length === 0">No matches yet</p>
    <div v-for="mutualMatch in mutualMatches">
      <!-- V if statement to show user that is not the Current User -->
      <div v-if="mutualMatch.sender.id !== $parent.getUserId()">
        <!-- Router Link redirects to match show -->
        <router-link :to="`/matches/${mutualMatch.id}`"
          ><img :src="`${mutualMatch.sender.image_url}`" alt=""
        /></router-link>
        <p>
          <strong>{{ mutualMatch.sender.first_name }}</strong
          ><br />

          (<i>{{ mutualMatch.sender.pronouns }}</i
          >) <i>{{ $parent.age(mutualMatch.sender.birth_date) }}</i>
        </p>
        <!-- <p>
            <strong>{{ mutualMatch.last_message.sender.first_name }}:</strong>
            {{ mutualMatch.last_message.body }}
            <i
              >{{
                $parent.lastMessageSent(mutualMatch.last_message.sent)
              }}
              hours ago</i
            >
          </p> -->
        <p>
          <strong><u>Signs</u></strong
          >:
        </p>
        <ul>
          <li>
            Sun: <strong>{{ mutualMatch.sender.sun_sign }}</strong>
          </li>
          <li>
            Moon: <strong>{{ mutualMatch.sender.moon_sign }}</strong>
          </li>
          <li>
            Ascendent:
            <strong>{{ mutualMatch.sender.ascending_sign }}</strong>
          </li>
        </ul>
        <p v-if="mutualMatch.super">Compatibility: <strong>Super</strong></p>
        <p>
          Location: <strong>{{ mutualMatch.sender.current_location }}</strong>
        </p>
        <p>
          <strong>About:</strong><br />
          {{ mutualMatch.sender.bio }}
        </p>
        <button v-on:click="unmatch(mutualMatch)">Unmatch</button>
        <br />
        <br />
      </div>

      <!-- V Else called to show non current User information -->
      <div v-else>
        <!-- Router Link redirects to match show -->
        <router-link :to="`/matches/${mutualMatch.id}`"
          ><img :src="`${mutualMatch.recipient.image_url}`" alt=""
        /></router-link>
        <p>
          <strong>{{ mutualMatch.recipient.first_name }}</strong
          ><br />
          (<i>{{ mutualMatch.recipient.pronouns }}</i
          >) <i>{{ $parent.age(mutualMatch.recipient.birth_date) }}</i>
        </p>
        <p>
          <strong><u>Signs</u></strong
          >:
        </p>
        <ul>
          <li>
            Sun: <strong>{{ mutualMatch.recipient.sun_sign }}</strong>
          </li>
          <li>
            Moon: <strong>{{ mutualMatch.recipient.moon_sign }}</strong>
          </li>
          <li>
            Ascendent:
            <strong>{{ mutualMatch.recipient.ascending_sign }}</strong>
          </li>
        </ul>
        <p v-if="mutualMatch.super">Compatibility: <strong>Super</strong></p>
        <p>
          <!-- Compatibility/Ranking is not being passed for Matches in the backend -->
          <!-- <p v-if="mutualMatch.recipient.ranking > 0">
        Compatibility: <strong>Super</strong>
      </p> -->
        </p>

        <p>
          Location:
          <strong>{{ mutualMatch.recipient.current_location }}</strong>
        </p>
        <p>
          <strong>About:</strong><br />
          {{ mutualMatch.recipient.bio }}
        </p>
        <button v-on:click="unmatch(mutualMatch)">Unmatch</button>
        <br />
        <br />
      </div>
    </div>

    <!-- Received Matches Data -->
    <!-- Received Matches Should be sort with most recent first -->
    <h1>Received Matches</h1>

    <p v-if="receivedMatches.length === 0">No matches yet</p>

    <div v-for="receivedMatch in receivedMatches">
      <!-- Received only get send if you are the recipient -->
      <!-- Router Link redirects to match show -->
      <router-link :to="`/matches/${receivedMatch.id}`"
        ><img :src="`${receivedMatch.sender.image_url}`" alt=""
      /></router-link>
      <p>
        <strong>{{ receivedMatch.sender.first_name }}</strong
        ><br />
        (<i>{{ receivedMatch.sender.pronouns }}</i
        >) <i>{{ $parent.age(receivedMatch.sender.birth_date) }}</i>
      </p>
      <p>
        <strong><u>Signs</u></strong
        >:
      </p>
      <ul>
        <li>
          Sun: <strong>{{ receivedMatch.sender.sun_sign }}</strong>
        </li>
        <li>
          Moon: <strong>{{ receivedMatch.sender.moon_sign }}</strong>
        </li>
        <li>
          Ascendent:
          <strong>{{ receivedMatch.sender.ascending_sign }}</strong>
        </li>
      </ul>
      <p v-if="receivedMatch.super">Compatibility: <strong>Super</strong></p>
      <p>
        <!-- Compatibility/Ranking is not being passed for Matches in the backend -->
        <!-- <p v-if="receivedMatch.sender.ranking > 0">
        Compatibility: <strong>Super</strong>
      </p> -->
      </p>

      <p>
        Location: <strong>{{ receivedMatch.sender.current_location }}</strong>
      </p>
      <p>
        <strong>About:</strong><br />
        {{ receivedMatch.sender.bio }}
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
export default {
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
