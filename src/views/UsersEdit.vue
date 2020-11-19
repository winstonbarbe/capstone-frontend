<template>
  <div class="users-edit">
    <header class="page-header small bg-secondary">
      <div class="container">
        <div class="header-content text-center">
          <h1 class="header-title bg-transparent">EDIT PROFILE</h1>
        </div>
      </div>
      <!-- / container -->
    </header>

    <section id="pricing" class="big-section bg-white">
      <div class="container">
        <form v-on:submit.prevent="updateUser()">
          <!-- Astrological and Personal -->
          <div class="row">
            <!-- Astrological -->
            <div class="col-md-4">
              <div class="pricing-table bg-light">
                <div class="pricing-table-title">
                  <h5 class="pricing-title bg-secondary">Astrological</h5>
                </div>

                <div class="pricing-table-price text-center">
                  <div style="padding:30px;" class="form-group bg-light">
                    <div class="row">
                      <div class="col-md-12 mb-3">
                        <label>Sun Sign</label>
                        <select
                          class="form-control input-group-text mb-4 text-center bg-secondary"
                          v-model="user.sun_sign"
                        >
                          <option v-if="!user.sun_sign" disabled
                            >Choose..</option
                          >
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

                        <label>Moon Sign</label>
                        <select
                          class="form-control input-group-text mb-4 text-center bg-secondary"
                          v-model="user.moon_sign"
                        >
                          <option v-if="!user.moon_sign" disabled
                            >Choose..</option
                          >
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

                        <label>Ascending Sign</label>
                        <select
                          class="form-control input-group-text mb-4 text-center bg-secondary"
                          v-model="user.ascending_sign"
                        >
                          <option v-if="!user.ascending_sign" disabled
                            >Choose..</option
                          >
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
                    </div>
                  </div>
                </div>
              </div>
              <!-- / pricing-table -->
            </div>
            <!-- / column -->
            <div class="col-md-8">
              <div class="pricing-table bg-light">
                <div class="pricing-table-title">
                  <h5 class="pricing-title bg-secondary">Personal</h5>
                </div>

                <div class="pricing-table-price text-center">
                  <div style="padding:30px;" class="form-group">
                    <div class="row">
                      <div class="col-md-6 ">
                        <label>Gender: </label>
                        <select class="form-control" v-model="user.gender">
                          <option v-if="!user.gender" disabled></option>
                          <option value="Female">Female</option>
                          <option value="NB">NB</option>
                          <option value="Male">Male</option>
                        </select>
                        <br />
                        <br />
                        <label>Interested In: </label>
                        <select
                          class="form-control"
                          v-model="user.interested_in"
                        >
                          <option v-if="!user.interested_in" disabled></option>
                          <option value="All">All</option>
                          <option value="Men">Men</option>
                          <option value="Women">Women</option>
                        </select>
                        <br />
                        <br />
                        <label>Hidden From: </label>
                        <select class="form-control" v-model="user.seen_by">
                          <option v-if="!user.seen_by" disabled> </option
                          ><option value="1">Men</option>
                          <option value="0">No one</option>
                          <option value="-1">Women</option>
                        </select>
                      </div>
                      <div class="col-md-6">
                        <label>Address: </label>
                        <input
                          required
                          type="text"
                          class="form-control"
                          v-model="user.current_location"
                        />
                        <br />
                        <br />
                        <label>Bio:</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model="user.bio"
                        />
                        <br />
                        <br />
                        <label>Birth Date</label><br />
                        <input
                          type="date"
                          class="btn btn-warning"
                          v-model="user.birth_date"
                          :max="minAge"
                        />
                        <br />
                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- / pricing-table -->
            </div>
            <!-- / column -->
          </div>
          <!-- End Astrological and Personal -->

          <!-- Account and Image  -->
          <div class="row">
            <!-- Images -->
            <div class="col-md-8">
              <div class="pricing-table bg-light">
                <!-- Image table title -->
                <div class="pricing-table-title">
                  <h5 class="pricing-title bg-secondary">Images</h5>
                </div>
                <!-- end Image table title -->
                <div class="pricing-table-price text-center">
                  <div class="row p-3">
                    <div class="col-md-4 mb-4">
                      <div class="post-image">
                        <div v-if="user.images" class="hovereffect">
                          <img
                            class="img-responsive mx-auto"
                            :src="user.images[0].url"
                            :alt="user.name"
                          />
                          <button
                            v-on:click="deletePhoto(user.images[0])"
                            type="button"
                            class="btn-sm btn-danger mt-3"
                          >
                            Delete
                          </button>
                        </div>
                        <div v-else>
                          <img
                            class="img-responsive mx-auto"
                            src="/images/midheaven4.png"
                            alt="logo"
                          />

                          <br />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 mb-4">
                      <div class="post-image ">
                        <div
                          v-if="user.images && user.images[1]"
                          class="hovereffect"
                        >
                          <img
                            class="img-responsive mx-auto"
                            :src="user.images[1].url"
                            :alt="user.name"
                          />
                          <button
                            v-on:click="deletePhoto(user.images[1])"
                            type="button"
                            class="btn-sm btn-danger mt-3"
                          >
                            Delete
                          </button>
                        </div>
                        <div v-else>
                          <img
                            class="img-responsive mx-auto"
                            src="/images/midheaven4.png"
                            alt="logo"
                          />

                          <br />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4 mb-4">
                      <div class="post-image">
                        <div
                          v-if="user.images && user.images[2]"
                          class="hovereffect"
                        >
                          <img
                            class="img-responsive mx-auto"
                            :src="user.images[2].url"
                            :alt="user.name"
                          />
                          <button
                            v-on:click="deletePhoto(user.images[2])"
                            type="button"
                            class="btn-sm btn-danger mt-3"
                          >
                            Delete
                          </button>
                        </div>
                        <div v-else>
                          <img
                            class="img-responsive mx-auto"
                            src="/images/midheaven4.png"
                            alt="logo"
                          />
                          <input
                            type="file"
                            class="custom-file-input"
                            v-on:change="setFile($event)"
                            id="inputGroupFile01"
                            aria-describedby="inputGroupFileAddon01"
                            ref="fileInput"
                          />
                          <div>
                            <label
                              class="custom-file-label text-left"
                              for="inputGroupFile01"
                              >Choose file</label
                            >
                          </div>
                          <br />
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- / pricing-table -->
            </div>
            <!-- end Images -->
            <div class="col-md-4">
              <div class="pricing-table bg-light">
                <div class="pricing-table-title">
                  <h5 class="pricing-title bg-secondary">Account</h5>
                </div>

                <!-- Name, email, prounouns, password -->
                <div class="pricing-table-price text-center">
                  <div style="padding:30px;" class="form-group">
                    <label>Name: </label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user.name"
                    />
                    <br />
                    <br />
                    <label>Email: </label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user.email"
                    />
                    <br />
                    <br />
                    <label>Pronouns: </label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="user.pronouns"
                    />
                    <br />
                    <br />
                    <div v-if="changePassword" class="form-group">
                      <label>Old Password: </label>
                      <input
                        type="password"
                        class="form-control"
                        v-model="oldPassword"
                      />
                    </div>
                    <div v-if="changePassword" class="form-group">
                      <label>New Password: </label>
                      <input
                        type="password"
                        class="form-control"
                        v-model="newPassword"
                      />
                    </div>
                    <div v-if="changePassword" class="form-group">
                      <label>New Password Confirmation: </label>
                      <input
                        type="password"
                        class="form-control"
                        v-model="newPasswordConfirmation"
                      />
                    </div>
                    <button
                      class="btn btn-warning"
                      v-if="!changePassword"
                      v-on:click="updatePasswordOption()"
                    >
                      Change Password
                    </button>
                    <br />
                  </div>
                </div>
              </div>
              <!-- / pricing-table -->
            </div>
          </div>
          <!-- End Account and Images -->
          <!-- Buttons -->
          <!-- Should through an error if it's not complete -->
          <span>
            <input type="submit" class="btn btn-warning" value="Update" />
            |
            <!-- Delete Button -->

            <button class="btn btn-danger" v-on:click="destroyUser()">
              Delete Account
            </button>
            |

            <!-- Back Button -->
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="$router.push(`/users/${user.id}`)"
            >
              Back
            </button>
            <p class="box-description mb-0">
              To find your birth chart list
              <a href="https://astro.cafeastrology.com/natal.php">here</a>.
            </p>
          </span>
        </form>

        <!-- / row -->
      </div>
      <!-- / container -->
    </section>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      images: [],
      imageOne: false,
      imageTwo: false,
      imageThree: false,
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
      if (this.user.images) {
        this.images = this.user.images;
        this.imageOne = true;
        if (this.user.images[1]) {
          this.imageTwo = true;
          if (this.user.image[2]) {
            this.imageThree = true;
          }
        }
      }
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
      var params = {
        name: this.user.ame,
        email: this.user.email,
        sun_sign: this.user.sun_sign,
        moon_sign: this.user.moon_sign,
        ascending_sign: this.user.ascending_sign,
        gender: this.user.gender,
        interested_in: this.user.interested_in,
        pronouns: this.user.pronouns,
        current_location: this.user.current_location,
        birth_date: this.user.birth_date,
        bio: this.user.bio,
        seen_by: this.user.seen_by,
      };
      if (
        this.oldPassword &&
        this.newPassword &&
        this.newPasswordConfirmation
      ) {
        params.old_password = this.oldPassword;
        params.new_password = this.newPassword;
        params.new_password_confirmation = this.newPasswordConfirmation;
      }

      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    uploadImage: function() {
      var formData = new FormData();
      formData.append("image", this.image);

      axios
        .post(`/api/images/`, formData)
        .then((response) => {
          console.log(response.data);
          let image = response.data;
          if (this.user.images) {
            this.user.images.push({
              id: image.id,
              url: image.url,
            });
          } else {
            this.user.images = {
              id: image.id,
              url: image.url,
            };
          }
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      if (confirm("Are you sure you want to delete your account?")) {
        axios.delete(`/api/users/${this.user.id}`).then((response) => {
          console.log("Account Destroyed");
          localStorage.removeItem("jwt");
          localStorage.removeItem("user_id");
          localStorage.removeItem("user_age");
          this.$router.push("/login");
        });
      }
    },
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
        this.uploadImage();
      }
    },
    updatePasswordOption: function() {
      this.changePassword = !this.changePassword;
    },
    deletePhoto: function(picture) {
      if (confirm("Are you sure you want to delete this photo?")) {
        axios.delete(`/api/images/${picture.id}`).then((response) => {
          console.log("Picture Deleted");
          var index = this.images.indexOf(picture);
          // if (index == 0) {
          //   if (this.imageThree && this .imageTwo) {}
          // }
          this.user.images.splice(index, 1);
        });
      }
    },
  },
};
</script>
