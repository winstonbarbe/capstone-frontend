<template>
  <div class="users-index">
    <h1>Compatible Users</h1>
    <!-- User Info -->
    <div v-for="user in users">
      <router-link :to="`/users/${user.id}`"
        ><img :src="user.image_url" :alt="user.first_name"
      /></router-link>

      <!-- For age add moment js -->
      <p>
        <strong>{{ user.first_name }}</strong
        ><br />
        (<i>{{ user.pronouns }}</i
        >) <i>{{ age(user.birth_date) }}</i>
      </p>
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
      <p>
        Location: <strong>{{ user.current_location }}</strong>
      </p>
      <p>
        <strong>About:</strong><br />
        {{ user.bio }}
      </p>

      <p>------------------------------------------------</p>
    </div>
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
export default {
  data: function() {
    return {
      users: [],
    };
  },
  created: function() {
    axios.get("/api/users").then((response) => {
      console.log(response.data);
      this.users = response.data;
    });
  },
  methods: {
    age: function(birthDate) {
      return moment().diff(birthDate, "years");
    },
  },
};
</script>
