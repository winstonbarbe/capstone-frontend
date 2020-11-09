<template>
  <div class="matches-show">
    <h1>Match</h1>
    <!-- Match info section -->
    <!-- -->
    <div v-if="mutualMatch.sender.id !== $parent.getUserId()">
      <div>
        <img :src="`${mutualMatch.sender.image_url}`" alt="" />
        <p>
          <strong>{{ mutualMatch.sender.first_name }}</strong
          ><br />(<i>{{ mutualMatch.sender.pronouns }}</i
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
            Ascendent:
            <strong>{{ mutualMatch.sender.ascending_sign }}</strong>
          </li>
        </ul>
        <!-- Compatibility/Ranking is not being passed for Matches in the backend -->
        <p v-if="mutualMatch.sender.ranking > 0">
          Compatibility: <strong>Super</strong>
        </p>
        <p>
          Location:
          <strong>{{ mutualMatch.sender.current_location }}</strong>
        </p>
        <p>
          <strong>About:</strong><br />
          {{ mutualMatch.sender.bio }}
        </p>
      </div>
      <button v-on:click="unmatch(mutualMatch)">Unmatch</button>
    </div>
    <div v-else>
      <div>
        <img :src="`${mutualMatch.recipient.image_url}`" alt="" />
        <p>
          <strong>{{ mutualMatch.recipient.first_name }}</strong
          ><br />(<i>{{ mutualMatch.recipient.pronouns }}</i
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
        <p v-if="mutualMatch.recipient.ranking > 0">
          Compatibility: <strong>Super</strong>
        </p>
        <p>
          Location:
          <strong>{{ mutualMatch.recipient.current_location }}</strong>
        </p>
        <p>
          <strong>About:</strong><br />
          {{ mutualMatch.recipient.bio }}
        </p>
      </div>
      <button v-on:click="unmatch(mutualMatch)">Unmatch</button>
    </div>

    <!-- Message section -->
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
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function() {
    return {
      newMessage: "",
      mutualMatch: {
        recipient: {},
        sender: {},
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
  },
};
</script>
