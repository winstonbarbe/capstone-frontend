<template>
  <div class="matches-show">
    <div class="container p-0">
      <!-- Compatibles filter -->
      <ul
        class="portfolio-filter list-inline text-center filter-bg bg-secondary"
      >
        <h1>MATCH</h1>
      </ul>
    </div>
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
                  <div class="spacer">&nbsp;</div>
                  <router-link :to="`/matches/`">Back</router-link>
                  <div class="spacer">&nbsp;</div>

                  <!-- Messages -->
                  <h4 v-if="match.mutual == 1" class="section-title mb-3">
                    Messages
                  </h4>
                  <div class="spacer">&nbsp;</div>
                  <div
                    v-if="match.mutual == 1"
                    class="sidebar-widget"
                    style="max-height:400px;overflow:scroll;display:flex;flex-direction:column-reverse;"
                  >
                    <div class="post-widget">
                      <ul class="list-unstyled">
                        <li v-for="message in match.messages">
                          <div class="recent-posts">
                            <div class="recent-post-content">
                              <h5 class="mb-0">
                                <a class="recent-post-title">{{
                                  message.name
                                }}</a>
                              </h5>
                              <p class="text-sm mb-1">{{ message.body }}</p>
                              <p class="text-sm opc-75 mb-0">
                                {{ sent(message.created_at) }}
                              </p>
                            </div>
                            <!-- / recent-post-content -->
                          </div>
                          <!-- / recent-posts -->
                        </li>
                      </ul>
                    </div>
                    <!-- / post-widget -->
                  </div>
                  <!-- / sidebar-widget -->

                  <div v-if="match.mutual == 1" class="row">
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

                  <div v-if="match.mutual == 1" class="text-center">
                    <button
                      v-on:click="sendMessage()"
                      class="btn btn-submit btn-primary rectangle"
                    >
                      <span>Send Message</span>
                    </button>
                    <div id="msgSubmit" class="h3 text-center hidden"></div>
                    <div class="clearfix"></div>
                  </div>
                  <!-- / text-center -->

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
    <!-- / project-details -->
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
        this.match.messages.push(data); // update the messages in real time
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
