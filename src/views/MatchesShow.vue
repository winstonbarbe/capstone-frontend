<template>
  <div class="matches-show">
    <h1>Match</h1>
    <section id="project-details">
      <div class="container">
        <div class="section-w-image">
          <div class="row vtop">
            <div class="col-lg-7 project-details-image">
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

                  <form id="contactForm" data-toggle="validator">
                    <div class="row">
                      <!-- / sub-column -->
                      <div class="col-md-12">
                        <div class="form-group mb-2">
                          <textarea
                            id="message"
                            class="form-control"
                            rows="5"
                            placeholder="*Message"
                            required
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

    <!-- Match info section -->
    <!-- -->
    <div>
      <img :src="`${match.matcher.image_url}`" alt="" />
      <p>
        <strong>{{ match.matcher.name }}</strong
        ><br />(<i>{{ match.matcher.pronouns }}</i
        >) <i>{{ $parent.age(match.matcher.birth_date) }}</i>
      </p>
      <p>
        <strong><u>Signs</u></strong
        >:
      </p>
      <ul>
        <li>
          Sun: <strong>{{ match.matcher.sun_sign }}</strong>
        </li>
        <li>
          Moon: <strong>{{ match.matcher.moon_sign }}</strong>
        </li>
        <li>
          Ascendent:
          <strong>{{ match.matcher.ascending_sign }}</strong>
        </li>
      </ul>
      <p v-if="match.super">Compatibility: <strong>Super</strong></p>
      <p>
        Distance:
        <strong>{{ match.matcher.distance }}</strong>
      </p>
      <p>
        <strong>About:</strong><br />
        {{ match.matcher.bio }}
      </p>
    </div>
    <button v-if="match.mutual == 1" v-on:click="unmatch(match)">
      Unmatch
    </button>
    <button v-if="match.mutual == 0" v-on:click="unmatch(match)">
      Deny
    </button>
    <button v-if="match.mutual == 0" v-on:click="acceptMatch(match)">
      Accept
    </button>
    <button v-on:click="$router.push('/matches')">Back</button>
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
