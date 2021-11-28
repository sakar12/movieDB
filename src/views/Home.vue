<template>
<div style="background-color:black;">
  <v-container  fluid>
    <v-img
      contain
      src="https://wallpapermemory.com/uploads/262/the-dark-knight-rises-wallpaper-hd-1080p-161226.jpg"
      id="img"
      class="mt-n3"
    />

    <!-- <v-layout row wrap>
  <v-flex xs12 sm12>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
      <v-layout column align-center justify-center>
        <h1>title</h1>
      </v-layout>
    </v-parallax>
  </v-flex>
</v-layout> -->
    <!-- <v-parallax
      class="mt-n3"
      
      jumbotron
      
    ></v-parallax> -->
  </v-container>
</div>
</template>

<script>
export default {
  name: "Home",

  data: () => ({
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home" },
      { title: "Movies", icon: "mdi-movie-play" },
      { title: "Tv Shows", icon: "mdi-movie-star" },
      { title: "History", icon: "mdi-history" },
    ],
    right: null,
  }),

  components: {},
};
</script>
<style scoped>
#img {
  width: 100%;
  height: 100%;
}

body {
    background: orange;
}
</style>
