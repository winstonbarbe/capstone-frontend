<template>
  <div app="users-show">
    <img :src="user.image_url" :alt="user.first_name" />
    <h1>{{ user.first_name }}</h1>
    <!-- For age add moment js -->
    <p>
      (<i>{{ user.pronouns }}</i
      >) {{ user.birth_date }}
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
    <p>
      Location: <strong>{{ user.current_location }}</strong>
    </p>
    <p>
      <strong>About:</strong><br />
      {{ user.bio }}
    </p>

    <p></p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
};
</script>
