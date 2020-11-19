<template>
  <div class="signup">
    <header class="page-header small bg-secondary">
      <div class="container">
        <div class="header-content text-center">
          <h1 class="header-title bg-transparent">SIGN UP</h1>
        </div>
      </div>
      <!-- / container -->
    </header>

    <section id="contact-form" class="big-section">
      <div class="container">
        <div class="row">
          <div class="col-md-5 contact-info-area">
            <div class="contact-info text-left">
              <h5 class="box-title mb-3 text-primary">ADDRESS</h5>
              <p class="box-description mb-0">
                There is no way to fully grasp two personalities and their
                relationship potential based on the compatibility of their Sun
                signs.
                <strong
                  >Midheaven takes more than just your sun sign into
                  account</strong
                >. Utilizing your sun, moon, ascending sign allows us to
                generate
                <strong>a hyper-personalized dating experience</strong>.Our
                unique system uses both natal charts and their comparison to
                gain crucial insights into the specific stories of each couple.
                <strong
                  >Star crossed? Fated to fall in love? Find out with
                  Midheaven.</strong
                >
              </p>
              <br />
              <br />
              <p class="box-description mb-0">
                To find your birth chart list
                <a href="https://astro.cafeastrology.com/natal.php">here</a>.
              </p>
            </div>
            <!-- / contact-info -->
            <!-- / contact-info -->
          </div>
          <!-- / column -->

          <div class="col-md-6">
            <form
              id="contactForm"
              data-toggle="validator"
              v-on:submit.prevent="submit()"
            >
              <h1>Signup</h1>
              <ul>
                <li class="text-danger" v-for="error in errors">{{ error }}</li>
              </ul>
              <div class="form-group">
                <label>Name:</label>
                <input type="text" class="form-control" v-model="name" />
              </div>
              <div class="form-group">
                <label>Email:</label>
                <input type="email" class="form-control" v-model="email" />
              </div>
              <div class="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                />
              </div>
              <div class="form-group">
                <label>Password confirmation:</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="passwordConfirmation"
                />
              </div>
              <input type="submit" class="btn btn-primary" value="Submit" />
            </form>
            <!-- / contactform -->
          </div>
          <!-- / column -->
        </div>
        <!-- / row -->
      </div>
      <!-- / container -->
    </section>
    <!-- / contact-form -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          console.log(response.data);
          params = {
            email: this.email,
            password: this.password,
          };
          axios
            .post("/api/sessions", params)
            .then((response) => {
              axios.defaults.headers.common["Authorization"] =
                "Bearer " + response.data.jwt;
              localStorage.setItem("jwt", response.data.jwt);
              localStorage.setItem("user_id", response.data.user_id);
              this.$router.push(
                `/users/${localStorage.getItem("user_id")}/edit`
              );
              console.log(response.data);
            })
            .catch((error) => {
              this.errors = ["Invalid email or password."];
              this.email = "";
              this.password = "";
            });
          // this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
