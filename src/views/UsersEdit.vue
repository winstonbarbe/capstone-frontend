<template>
  <div class="users-edit">
    <form v-on:submit.prevent="updateUser()">
      <h1>Edit Recipe</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>

      <!-- Astrological Info -->

      <!-- Sun Sign -->
      <div class="form-group">
        {{ user.sun_sign }}
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
        Birth Date:
        <label>Year: </label>
        <select class="form-control" v-model="year">
          <option v-if="!years" disabled></option>
          <option v-for="y in years">{{ y }}</option>
        </select>
        |
        <label>Month: </label>
        <select class="form-control" v-model="month">
          <option v-if="!month" disabled></option>
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">Apr</option>
          <option value="05">May</option>
          <option value="06">Jun</option>
          <option value="07">Jul</option>
          <option value="08">Aug</option>
          <option value="09">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
        |
        <label>Day: </label>
        <select class="form-control" v-model="day">
          <option v-if="!day" disabled></option>
          <option value="01">1</option>
          <option value="02">2</option>
          <option value="03">3</option>
          <option value="04">4</option>
          <option value="05">5</option>
          <option value="06">6</option>
          <option value="07">7</option>
          <option value="08">8</option>
          <option value="09">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option v-if="month != '02'" value="29">29</option>
          <option v-else-if="year % 4 == 0" value="29">29</option>
          <option v-if="month != '02'" value="30">30</option>
          <option
            v-if="
              month == '01' ||
                month == '03' ||
                month == '05' ||
                month == '07' ||
                month == '08' ||
                month == '10' ||
                month == '12'
            "
            value="31"
            >31</option
          >
        </select>

        <!-- <input type="text" class="form-control" v-model="user.birth_date" /> -->
      </div>

      <!-- Current Location should be able to get actual Location -->
      <!-- At least by searchable thru dropdown and stuff like that -->
      <div class="form-group">
        <label>Address or Zip Code:</label>
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
      <!-- Maybe have a button for updating Names -->
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
        <input type="password" class="form-control" v-model="oldPassword" />
      </div>
      <div class="form-group">
        <label>New Password:</label>
        <input type="password" class="form-control" v-model="newPassword" />
      </div>
      <div class="form-group">
        <label>New Password Confirmation:</label>
        <input
          type="password"
          class="form-control"
          v-model="newPasswordConfirmation"
        />
      </div>

      <!-- Buttons -->
      <span>
        <!-- Update Button -->
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

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      years: [],
      birthDate: "",
      month: "",
      day: "",
      year: "",
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
    let i = 1900;
    while (i <= 2020 - 18) {
      this.years.push(`${i}`);
      i++;
    }
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
        year: this.year,
        month: this.month,
        day: this.day,
        bio: this.user.bio,
        image_url: this.user.image_url,
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      axios.delete(`/api/users/${this.user.id}`).then((response) => {
        console.log("Account Destroyed", response.data);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user_id");
        this.$router.push("/");
      });
    },
  },
};
</script>
