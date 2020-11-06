<template>
  <div class="users-show">
    <img :src="user.image_url" :alt="user.first_name" />

    <h1>
      {{ user.first_name }}
      <span v-if="$parent.currentUser(user)">{{ user.last_name }}</span>
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
    <p>
      Location: <strong>{{ user.current_location }}</strong>
    </p>
    <p>
      <strong>About:</strong><br />
      {{ user.bio }}
    </p>
    <!-- Account info for current user -->
    <p v-if="$parent.currentUser(user)"><strong>Account Info</strong></p>
    <p v-if="$parent.currentUser(user)">Email: {{ user.email }}</p>
    <p v-if="$parent.currentUser(user)">Gender: {{ user.gender }}</p>
    <p v-if="$parent.currentUser(user)">
      Interested In: {{ user.interested_in }}
    </p>
    <router-link v-if="$parent.currentUser(user)" :to="`/users/${user.id}/edit`"
      >Edit</router-link
    >
    <!-- A button to come to later to create a back. -->
    <!-- <button @click="$router.push(``)">Click to Navigate</button> -->
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
  methods: {},
};
</script>
