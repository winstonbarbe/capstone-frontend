<template>
  <div class="users-edit">
    {{ user }}
    <form v-on:submit.prevent="updateUser()">
      <h1>Edit User</h1>
      <!-- Example of dropdown select, What is class and id of dropdown all about -->
      <!-- <div class="form-group">
        <label for="exampleFormControlSelect1">Example select</label>
        <select class="form-control" id="exampleFormControlSelect1">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div> -->

      <!-- Astrological Info -->
      <!-- Turn all of these to dropdown select menus -->
      <div class="form-group">
        <label>Sun Sign:</label>
        <input type="text" class="form-control" v-model="user.sun_sign" />
      </div>
      <div class="form-group">
        <label>Moon Sign:</label>
        <input type="text" class="form-control" v-model="user.moon_sign" />
      </div>
      <div class="form-group">
        <label>Ascending Sign:</label>
        <input type="text" class="form-control" v-model="user.ascending_sign" />
      </div>
      <!-- Personal Prefence and info -->
      <!-- Gender should be dropdown -->
      <div class="form-group">
        <label>Gender:</label>
        <input type="text" class="form-control" v-model="user.gender" />
      </div>
      <!-- Interested In should be dropdown -->
      <div class="form-group">
        <label>Interested In:</label>
        <input type="text" class="form-control" v-model="user.interested_in" />
      </div>
      <!-- Pronouns MAYBE should be dropdown -->
      <div class="form-group">
        <label>Pronouns:</label>
        <input type="text" class="form-control" v-model="user.pronouns" />
      </div>
      <!-- Birthday select should be refined -->
      <div class="form-group">
        <label>Birth Date:</label>
        <input type="text" class="form-control" v-model="user.birth_date" />
      </div>
      <!-- Current Location should be able to get actual Location -->
      <div class="form-group">
        <label>Current Location:</label>
        <input
          type="text"
          class="form-control"
          v-model="user.current_location"
        />
      </div>
      <!-- Add warning message or info about bio length -->
      <div class="form-group">
        <label>Bio:</label>
        <input type="text" class="form-control" v-model="user.bio" />
      </div>
      <!-- Add cloudinary -->
      <div class="form-group">
        <label>Image URL:</label>
        <input type="text" class="form-control" v-model="user.image_url" />
      </div>

      <!-- Account Information -->
      <div class="form-group">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="user.first_name" />
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="user.last_name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email" />
      </div>
      <!-- Password -->
      <!-- Show password only when attempting to change password and add warnings and stuff -->
      <div class="form-group">
        <label>Old Password:</label>
        <input type="text" class="form-control" v-model="oldPassword" />
      </div>
      <div class="form-group">
        <label>New Password:</label>
        <input type="text" class="form-control" v-model="newPassword" />
      </div>
      <div class="form-group">
        <label>New Password Confirmation:</label>
        <input
          type="text"
          class="form-control"
          v-model="newPasswordConfirmation"
        />
      </div>
      <input type="submit" class="btn btn-warning" value="Update" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      oldPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
      user: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function() {
      var params = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        old_password: this.oldPassword,
        new_password: this.newPassword,
        new_password_confirmation: this.newPasswordConfirmation,
        sun_sign: this.user.sun_sign,
        moon_sign: this.user.moon_sign,
        ascending_sign: this.user.ascending_sign,
        gender: this.user.gender,
        interested_in: this.user.interested_in,
        pronouns: this.user.pronouns,
        current_location: this.user.current_location,
        birth_date: this.user.birth_date,
        bio: this.user.bio,
        image_url: this.user.image_url,
      };
      // if (old_password) {}
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
