<template>
  <div class="matches-index">
    <!-- Mutual Match Data  -->
    <!-- Matches should be sorted by either updated at or Last message  -->
    <h1>Mutual Matches</h1>
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
            Ascendent: <strong>{{ mutualMatch.sender.ascending_sign }}</strong>
          </li>
        </ul>
        <!-- Compatibility/Ranking is not being passed for Matches in the backend -->
        <!-- <p v-if="mutualMatch.sender.ranking > 0">
        Compatibility: <strong>Super</strong>
      </p> -->
        <p>
          Location: <strong>{{ mutualMatch.sender.current_location }}</strong>
        </p>
        <p>
          <strong>About:</strong><br />
          {{ mutualMatch.sender.bio }}
        </p>
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
        <!-- Compatibility/Ranking is not being passed for Matches in the backend -->
        <!-- <p v-if="mutualMatch.recipient.ranking > 0">
        Compatibility: <strong>Super</strong>
      </p> -->
        <p>
          Location:
          <strong>{{ mutualMatch.recipient.current_location }}</strong>
        </p>
        <p>
          <strong>About:</strong><br />
          {{ mutualMatch.recipient.bio }}
        </p>
      </div>
    </div>

    <!-- Received Matches Data -->
    <!-- Received Matches Should be sort with most recent first -->
    <h1>Received Matches</h1>
    <div v-for="receivedMatch in receivedMatches">
      <!-- V if statement to show user that is not the Current User -->
      <div v-if="receivedMatch.sender.id !== $parent.getUserId()">
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
        <!-- Compatibility/Ranking is not being passed for Matches in the backend -->
        <!-- <p v-if="receivedMatch.sender.ranking > 0">
        Compatibility: <strong>Super</strong>
      </p> -->
        <p>
          Location: <strong>{{ receivedMatch.sender.current_location }}</strong>
        </p>
        <p>
          <strong>About:</strong><br />
          {{ receivedMatch.sender.bio }}
        </p>
      </div>

      <!-- V Else called to show non current User information -->
      <div v-else>
        <!-- Router Link redirects to match show -->
        <router-link :to="`/matches/${receivedMatch.id}`"
          ><img :src="`${receivedMatch.recipient.image_url}`" alt=""
        /></router-link>
        <p>
          <strong>{{ receivedMatch.recipient.first_name }}</strong
          ><br />
          (<i>{{ receivedMatch.recipient.pronouns }}</i
          >) <i>{{ $parent.age(receivedMatch.recipient.birth_date) }}</i>
        </p>
        <p>
          <strong><u>Signs</u></strong
          >:
        </p>
        <ul>
          <li>
            Sun: <strong>{{ receivedMatch.recipient.sun_sign }}</strong>
          </li>
          <li>
            Moon: <strong>{{ receivedMatch.recipient.moon_sign }}</strong>
          </li>
          <li>
            Ascendent:
            <strong>{{ receivedMatch.recipient.ascending_sign }}</strong>
          </li>
        </ul>
        <!-- Compatibility/Ranking is not being passed for Matches in the backend -->
        <!-- <p v-if="receivedMatch.recipient.ranking > 0">
        Compatibility: <strong>Super</strong>
      </p> -->
        <p>
          Location:
          <strong>{{ receivedMatch.recipient.current_location }}</strong>
        </p>
        <p>
          <strong>About:</strong><br />
          {{ receivedMatch.recipient.bio }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      receivedMatches: [],
      mutualMatches: [],
      user: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$parent.getUserId()}`).then((response) => {
      this.user = response.data;
    });
    axios.get(`/api/matches`).then((response) => {
      this.receivedMatches = response.data.received_matches;
    });
    axios.get(`/api/matches`).then((response) => {
      this.mutualMatches = response.data.mutual_matches;
    });
  },
};
</script>
