<template>
  <div class="users-index">
    <h1>Compatible Users</h1>
    <button v-on:click="showFilters()">Filters</button>
    <dialog id="filter-details">
      <form method="dialog">
        <h2>Filter Options</h2>
        <label>Minimum Age: </label>
        <select class="form-control" v-model="minAge">
          <option v-for="age in ages">{{ age }}</option>
        </select>
        <br />
        <label>Maximum Age: </label>
        <select class="form-control" v-model="maxAge">
          <option v-for="age in ages">{{ age }}</option>
        </select>
        <br />
        <label>Maximum Distance: </label>
        <select class="form-control" v-model="maxDistance">
          <option v-for="mile in miles">{{ mile }}</option>
        </select>
        <br />
        <button>Close</button>
      </form>
    </dialog>
    <br />
    <br />
    <!-- User Info -->
    <div v-for="user in users">
      <div
        v-if="
          $parent.age(user.birth_date) >= minAge &&
            $parent.age(user.birth_date) <= maxAge &&
            user.distance <= maxDistance
        "
      >
        <router-link :to="`/users/${user.id}`"
          ><img :src="user.image_url" :alt="user.name"
        /></router-link>

        <!-- For age add moment js -->
        <p>
          <strong>{{ user.name }}</strong
          ><br />
          (<i>{{ user.pronouns }}</i
          >) <i>{{ $parent.age(user.birth_date) }}</i>
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
          Distance: <strong>{{ user.distance }}</strong>
        </p>
        <p>
          <strong>About:</strong><br />
          {{ user.bio }}
        </p>
        <button v-on:click="match(user)">Match</button>
        <button v-on:click="dismissCompatible(user)">Dismiss</button>
        <p>------------------------------------------------</p>
      </div>
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
      minAge: "",
      maxAge: "",
      maxDistance: 25,
      users: [],
      ages: [],
      miles: [],
    };
  },
  created: function() {
    axios.get("/api/users").then((response) => {
      console.log(response.data);
      this.users = response.data;
      this.minAge = this.$parent.getUserAge() - 8;
      this.maxAge = this.$parent.getUserAge() + 8;
    });
    let i = 18;
    while (i < 90) {
      this.ages.push(i);
      i++;
    }
    i = 0;
    while (i < 5000) {
      if (i < 50) {
        i += 5;
      } else if (i < 200) {
        i += 25;
      } else if (i < 500) {
        i += 50;
      } else {
        i = 5000;
      }
      this.miles.push(i);
    }
  },
  methods: {
    match: function(recipient) {
      var superMatch = false;
      if (recipient.ranking > 7) {
        superMatch = true;
      }
      var params = {
        recipient_id: recipient.id,
        mutual: 0,
        super: superMatch,
      };
      axios.post(`/api/matches`, params).then((response) => {
        console.log("Match Created", response.data);
        var index = this.users.indexOf(recipient);
        this.users.splice(index, 1);
      });
    },
    dismissCompatible: function(recipient) {
      var superMatch = false;
      if (recipient.ranking > 7) {
        superMatch = true;
      }
      var params = {
        recipient_id: recipient.id,
        mutual: -1,
        super: superMatch,
      };
      axios.post(`/api/matches`, params).then((response) => {
        console.log("User Dismissed", response.data);
        var index = this.users.indexOf(recipient);
        this.users.splice(index, 1);
      });
    },
    showFilters: function() {
      document.querySelector("#filter-details").showModal();
    },
  },
};
</script>
