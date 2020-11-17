<template>
  <div class="matches-show">
    <h1>Match</h1>
    <section id="project-details">
      <div class="container">
        <div class="section-w-image">
          <div class="row vtop">
            <div class="col-lg-7 project-details-image">
              <div class="col-lg-12">
                <h6 class="mb-3">
                  GRAPHIC DESIGN <span class="pull-right">90%</span>
                </h6>
                <div class="progress">
                  <div
                    class="progress-bar bg-primary animated fadeInLeft first"
                    role="progressbar"
                    style="width: 90%; height: 10px"
                    aria-valuenow="90"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <!-- / progress -->

                <h6 class="mb-3">
                  WEB DESIGN <span class="pull-right">80%</span>
                </h6>
                <div class="progress">
                  <div
                    class="progress-bar bg-primary animated fadeInLeft second"
                    role="progressbar"
                    style="width: 80%; height: 10px"
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <!-- / progress -->

                <h6 class="mb-3">
                  PHOTOGRAPHY <span class="pull-right">95%</span>
                </h6>
                <div class="progress">
                  <div
                    class="progress-bar bg-primary animated fadeInLeft third"
                    role="progressbar"
                    style="width: 95%; height: 10px"
                    aria-valuenow="95"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <!-- / progress -->

                <h6 class="mb-3">
                  ILLUSTRATIONS <span class="pull-right">75%</span>
                </h6>
                <div class="progress mb-0">
                  <div
                    class="progress-bar bg-primary animated fadeInLeft fourth"
                    role="progressbar"
                    style="width: 75%; height: 10px"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <!-- / progress -->
              </div>

              <!-- / column -->
              <div v-for="image_url in match.matcher.image_urls">
                <img
                  :src="image_url"
                  :alt="match.matcher.name"
                  class="mb-3 mt-3"
                />
              </div>
            </div>
            <div class="col-lg-5 section-description has-sticky-top">
              <div class="sticky-top">
                <h4 class="section-title mb-3">
                  {{ match.matcher.name }}
                </h4>
                <p class="mb-3">
                  <i>({{ match.matcher.pronouns }})</i>
                  {{ $parent.age(match.matcher.birth_date) }}
                </p>
                <p class="mb-3">
                  {{ match.matcher.bio }}
                </p>
                <div class="project-info">
                  <!-- Astrological -->
                  <div class="info">
                    <h6 class="mb-1">Sun</h6>
                    <p>{{ match.matcher.sun_sign }}</p>
                  </div>
                  <div class="info">
                    <h6 class="mb-1">Moon</h6>
                    <p>{{ match.matcher.moon_sign }}</p>
                  </div>
                  <div class="info">
                    <h6 class="mb-1">Ascending</h6>
                    <p>{{ match.matcher.ascending_sign }}</p>
                  </div>
                  <!-- / info -->

                  <div v-if="match.matcher.ranking > 7" class="info">
                    <h6 class="mb-1">Compatibility</h6>
                    <p>Super</p>
                  </div>
                  <div class="info">
                    <h6 class="mb-1">Distance</h6>
                    <p>{{ match.matcher.distance }} Miles Away</p>
                  </div>

                  <!-- Buttons -->
                  <button
                    class="btn btn-outline-danger"
                    v-if="match.mutual == 1"
                    v-on:click="unmatch(match)"
                  >
                    Unmatch
                  </button>

                  <button
                    type="button"
                    class="btn btn-outline-success"
                    v-if="match.mutual == 0"
                    v-on:click="acceptMatch(match)"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    v-if="match.mutual == 0"
                    v-on:click="unmatch(match)"
                  >
                    Deny
                  </button>
                  <br />
                  <br />
                  <router-link :to="`/matches/`">Back</router-link>

                  <h4 class="section-title mb-3">
                    Messages
                  </h4>

                  <div
                    style="max-height:400px;overflow:scroll;"
                    class="project-info"
                  >
                    <div v-for="message in match.messages" class="info">
                      <h6 class="mb-1">{{ message.name }}</h6>
                      <p>{{ message.body }}</p>
                    </div>
                  </div>
                  <form
                    id="contactForm"
                    data-toggle="validator"
                    v-if="match.mutual == 1"
                  >
                    <div class="row">
                      <!-- / sub-column -->
                      <div class="col-md-12">
                        <div class="form-group mb-2">
                          <textarea
                            id="message"
                            v-model="newMessage"
                            class="form-control"
                            rows="5"
                            placeholder="new message..."
                          ></textarea>
                          <div class="help-block with-errors text-area"></div>
                        </div>
                      </div>
                      <!-- / sub-column -->
                    </div>
                    <!-- / row -->

                    <div class="text-center">
                      <button
                        type="submit"
                        id="form-submit"
                        class="btn btn-submit btn-primary rectangle"
                      >
                        <span>Send Message</span>
                      </button>
                      <div id="msgSubmit" class="h3 text-center hidden"></div>
                      <div class="clearfix"></div>
                    </div>
                    <!-- / text-center -->
                  </form>
                  <!-- / contactform -->

                  <!-- / container -->

                  <!-- / contact-form -->

                  <div v-if="match.mutual == 1">
                    <h2>Messages</h2>
                    <!-- Message Create -->
                    <textarea
                      v-model="newMessage"
                      placeholder="new message..."
                    ></textarea>
                    <br />
                    <button v-on:click="sendMessage()">Send</button>

                    <div
                      style="margin:auto;border:3px black;border-style:dotted none;width:400px;height:300px;line-height:2em;overflow:scroll;"
                    >
                      <div v-for="message in match.messages">
                        <p>
                          <strong>{{ message.name }}</strong
                          >:
                          {{ message.body }}
                          <i>{{ sent(message.created_at) }}</i>
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="info social-icons mb-0">
                    <a href="#x"><i class="fab fa-facebook-f mr-3"></i></a>
                    <a href="#x"><i class="fab fa-twitter mr-3"></i></a>
                    <a href="#x"><i class="fab fa-pinterest mr-3"></i></a>
                    <a href="#x"><i class="fab fa-google-plus-g mr-3"></i></a>
                  </div> -->
                  <!-- / info -->
                </div>
                <!-- / project-info -->
              </div>
              <!-- / sticky-top -->
            </div>
            <!-- / section-description -->
          </div>
          <!-- / row -->
        </div>
      </div>
      <!-- / container -->
    </section>
    <!-- / project-details -->s
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import ActionCable from "actioncable";

export default {
  data: function() {
    return {
      newMessage: "",
      match: {
        matcher: {},
      },
      messages: [],
    };
  },
  created: function() {
    axios.get(`/api/matches/${this.$route.params.id}`).then((response) => {
      console.log("Match Data", response.data);
      this.match = response.data;
      this.match.messages = this.match.messages.reverse();
    });
    var cable = ActionCable.createConsumer("ws://localhost:3000/cable");
    cable.subscriptions.create("MessagesChannel", {
      connected: () => {
        // Called when the subscription is ready for use on the server
        console.log("Connected to MessagesChannel");
      },
      disconnected: () => {
        // Called when the subscription has been terminated by the server
      },
      received: (data) => {
        // Called when there's incoming data on the websocket for this channel
        console.log("Data from MessagesChannel:", data);
        this.match.messages.unshift(data); // update the messages in real time
      },
    });
  },
  methods: {
    sent: function(createdAt) {
      return moment(createdAt).format("lll");
    },
    sendMessage: function() {
      var params = {
        match_id: this.match.id,
        body: this.newMessage,
      };
      axios.post("api/messages", params).then((response) => {
        console.log(response.data);
        // this.match.messages.push(response.data);
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
    acceptMatch: function(match) {
      var params = {
        mutual: 1,
      };
      axios
        .patch(`/api/matches/${match.id}`, params)
        .then((response) => {
          console.log("Match Accepted", response.data);
          this.match.mutual = 1;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
