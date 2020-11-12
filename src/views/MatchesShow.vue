<template>
  <div class="matches-show">
    <h1>Match</h1>

    <!-- Match info section -->
    <!-- -->
    <div>
      <img :src="`${mutualMatch.matcher.image_url}`" alt="" />
      <p>
        <strong>{{ mutualMatch.matcher.first_name }}</strong
        ><br />(<i>{{ mutualMatch.matcher.pronouns }}</i
        >) <i>{{ $parent.age(mutualMatch.matcher.birth_date) }}</i>
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
        Distance:
        <strong>{{ mutualMatch.matcher.distance }}</strong>
      </p>
      <p>
        <strong>About:</strong><br />
        {{ mutualMatch.matcher.bio }}
      </p>
    </div>
    <button v-if="mutualMatch.mutual == 1" v-on:click="unmatch(mutualMatch)">
      Unmatch
    </button>
    <button v-if="mutualMatch.mutual == 0" v-on:click="unmatch(mutualMatch)">
      Deny
    </button>
    <button
      v-if="mutualMatch.mutual == 0"
      v-on:click="acceptMatch(mutualMatch)"
    >
      Accept
    </button>

    <button v-on:click="$router.push('/matches')">Back</button>
    <div v-if="mutualMatch.mutual == 1">
      <h2>Messages</h2>
      <div v-for="message in mutualMatch.messages">
        <p>
          <strong>{{ message.sender.first_name }}</strong
          >:
          {{ message.body }}
          <i>{{ sent(message.sent) }}</i>
        </p>
      </div>
      <!-- Message Create -->
      <textarea v-model="newMessage" placeholder="new message..."></textarea>
      <br />
      <button v-on:click="sendMessage()">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function() {
    return {
      newMessage: "",
      mutualMatch: {
        matcher: {},
      },
    };
  },
  created: function() {
    axios.get(`/api/matches/${this.$route.params.id}`).then((response) => {
      console.log("Match Data", response.data);
      this.mutualMatch = response.data;
    });
  },
  methods: {
    sent: function(createdAt) {
      return moment(createdAt).format("lll");
    },
    sendMessage: function() {
      var params = {
        match_id: this.mutualMatch.id,
        body: this.newMessage,
      };
      axios.post("api/messages", params).then((response) => {
        console.log(response.data);
        this.mutualMatch.messages.push(response.data);
        this.newMessage = "";
      });
    },
    unmatch: function(match) {
      var params = {
        mutual: -1,
      };
      axios
        .patch(`/api/matches/${match.id}`, params)
        .then((response) => {
          console.log("Unmatched", response.data);
          this.$router.push("/matches");
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
          this.mutualMatch.mutual = 1;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
