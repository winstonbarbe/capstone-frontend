<template>
  <div class="users-edit">
    <form v-on:submit.prevent="updateUser()">
      <h1>Edit User</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <!-- Astrological Info -->
      <h2>Astrological</h2>
      <!-- Sun Sign -->
      <div class="form-group">
        <label>Sun Sign: </label>
        <select class="form-control" v-model="user.sun_sign">
          <option v-if="!user.sun_sign" disabled></option>
          <option value="Aries">Aries</option>
          <option value="Taurus">Taurus</option>
          <option value="Gemini">Gemini</option>
          <option value="Cancer">Cancer</option>
          <option value="Leo">Leo</option>
          <option value="Virgo">Virgo</option>
          <option value="Libra">Libra</option>
          <option value="Scorpio">Scorpio</option>
          <option value="Sagittarius">Sagittarius</option>
          <option value="Capricorn">Capricorn</option>
          <option value="Aquarius">Aquarius</option>
          <option value="Pisces">Pisces</option>
        </select>
      </div>

      <!-- Moon Sign -->
      <div class="form-group">
        <label>Moon Sign: </label>
        <select class="form-control" v-model="user.moon_sign">
          <option v-if="!user.moon_sign" disabled></option>
          <option value="Aries">Aries</option>
          <option value="Taurus">Taurus</option>
          <option value="Gemini">Gemini</option>
          <option value="Cancer">Cancer</option>
          <option value="Leo">Leo</option>
          <option value="Virgo">Virgo</option>
          <option value="Libra">Libra</option>
          <option value="Scorpio">Scorpio</option>
          <option value="Sagittarius">Sagittarius</option>
          <option value="Capricorn">Capricorn</option>
          <option value="Aquarius">Aquarius</option>
          <option value="Pisces">Pisces</option>
        </select>
      </div>

      <!-- Ascending Sign -->
      <div class="form-group">
        <label>Ascending Sign: </label>
        <select class="form-control" v-model="user.ascending_sign">
          <option v-if="!user.ascending_sign" disabled></option>
          <option value="Aries">Aries</option>
          <option value="Taurus">Taurus</option>
          <option value="Gemini">Gemini</option>
          <option value="Cancer">Cancer</option>
          <option value="Leo">Leo</option>
          <option value="Virgo">Virgo</option>
          <option value="Libra">Libra</option>
          <option value="Scorpio">Scorpio</option>
          <option value="Sagittarius">Sagittarius</option>
          <option value="Capricorn">Capricorn</option>
          <option value="Aquarius">Aquarius</option>
          <option value="Pisces">Pisces</option>
        </select>
      </div>

      <!-- Personal Prefence and info -->

      <h2>Personal</h2>
      <div class="form-group">
        <label>Gender: </label>
        <select class="form-control" v-model="user.gender">
          <option v-if="!user.gender" disabled></option>
          <option value="Female">Female</option>
          <option value="NB">NB</option>
          <option value="Male">Male</option>
        </select>
      </div>

      <!-- Interested In Dropdown Select -->
      <div class="form-group">
        <label>Interested In: </label>
        <select class="form-control" v-model="user.interested_in">
          <option v-if="!user.interested_in" disabled></option>
          <option value="All">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
      </div>

      <!-- Pronouns Dropdown Select -->
      <div class="form-group">
        <label>Pronouns: </label>
        <select class="form-control" v-model="user.pronouns">
          <option v-if="!user.pronouns" disabled></option>
          <option value="He/Him">He/Him</option>
          <option value="She/Her">She/Her</option>
          <option value="They/Them">They/Them</option>
        </select>
      </div>

      <!-- Birthday select should be refined -->

      <div class="form-group">
        <label>Birth Date: </label>
        <input
          type="date"
          class="btn btn-warning"
          v-model="user.birth_date"
          :max="minAge"
        />
      </div>

      <!-- Current Location should be able to get actual Location -->
      <!-- At least by searchable thru dropdown and stuff like that -->
      <div class="form-group">
        <label>Address: </label>
        <input
          required
          type="text"
          class="form-control"
          v-model="user.current_location"
        />
      </div>

      <!-- Add warning message or info about bio length -->
      <div class="form-group">
        <label>Bio: </label>
        <input type="text" class="form-control" v-model="user.bio" />
      </div>
      <!-- Add cloudinary -->
      <div class="form-group">
        <label>Image: </label>
        <input
          type="file"
          class="form-control"
          v-on:change="setFile($event)"
          ref="fileInput"
        />
      </div>

      <h2>Account</h2>
      <!-- Maybe have a button for updating Names -->
      <div class="form-group">
        <label>Name: </label>
        <input type="text" class="form-control" v-model="user.name" />
      </div>
      <div class="form-group">
        <label>Email: </label>
        <input type="text" class="form-control" v-model="user.email" />
      </div>

      <!-- Password -->
      <!-- Show password only when attempting to change password and add warnings and stuff -->

      <h3>Password</h3>

      <div v-if="changePassword" class="form-group">
        <label>Old Password: </label>
        <input type="password" class="form-control" v-model="oldPassword" />
      </div>
      <div v-if="changePassword" class="form-group">
        <label>New Password: </label>
        <input type="password" class="form-control" v-model="newPassword" />
      </div>
      <div v-if="changePassword" class="form-group">
        <label>New Password Confirmation: </label>
        <input
          type="password"
          class="form-control"
          v-model="newPasswordConfirmation"
        />
      </div>
      <button v-if="!changePassword" v-on:click="updatePasswordOption()">
        Change Password
      </button>
      <br />
      <!-- Buttons -->
      <!-- Should through an error if it's not complete -->
      <span>
        <input type="submit" class="btn btn-warning" value="Update" />
        |
        <!-- Delete Button -->

        <button v-on:click="destroyUser()">
          Delete Account
        </button>
        |

        <!-- Back Button -->
        <button v-on:click="$router.push(`/users/${user.id}`)">Back</button>
      </span>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      changePassword: false,
      address: "",
      minAge: "",
      years: [],
      birthDate: "",
      month: "",
      day: "",
      year: "1995",
      image: "",
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
      if (response.data.birth_date) {
        this.birthDate = response.data.birth_date.split("-");
        this.day = `${this.birthDate[2]}`;
        this.month = `${this.birthDate[1]}`;
        this.year = `${this.birthDate[0]}`;
      }
    });
    this.minAge = moment()
      .subtract(18, "years")
      .format("YYYY-MM-DD");
  },
  methods: {
    updateUser: function() {
      console.log(this.user.birth_date);
      console.log(typeof this.user.birth_date);
      var formData = new FormData();
      if (this.image) {
        formData.append("image", this.image);
      }
      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      formData.append("birth_date", this.user.birth_date);
      formData.append("old_password", this.oldPassword);
      formData.append("new_password", this.newPassword);
      formData.append(
        "new_password_confirmation",
        this.newPasswordConfirmation
      );
      formData.append("sun_sign", this.user.sun_sign);
      formData.append("moon_sign", this.user.moon_sign);
      formData.append("ascending_sign", this.user.ascending_sign);
      formData.append("gender", this.user.gender);
      formData.append("interested_in", this.user.interested_in);
      formData.append("pronouns", this.user.pronouns);
      formData.append("current_location", this.user.current_location);
      formData.append("bio", this.user.bio);

      axios
        .patch(`/api/users/${this.user.id}`, formData)
        .then((response) => {
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      axios.delete(`/api/users/${this.user.id}`).then((response) => {
        console.log("Account Destroyed");
        localStorage.removeItem("jwt");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_age");
        this.$router.push("/login");
      });
    },
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    updatePasswordOption: function() {
      this.changePassword = !this.changePassword;
    },
  },
};
</script>
