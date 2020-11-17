<template>
  <div class="home">
    <h1>{{ horoscope }}</h1>
  </div>
</template>
<script>
import aztroJs from "aztro-js";

export default {
  data: function() {
    return {
      horoscope: "ascffas",
    };
  },
  created: function() {
    this.horoscope = aztroJs.getAllHoroscope("Leo", function(res) {
      console.log(res.today.description);
    });
  },
};
</script>
