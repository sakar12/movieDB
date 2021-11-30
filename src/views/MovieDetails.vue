<template>
  <div style="background-color: black">
    <v-container fluid>
         <v-img
        :src="`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`" dark
        id="img"
        class="mt-n3"
      >
      <span id="my-span" class="text-h2 pa-2 d-flex justify-center">{{ movieDetails.title}}</span>
      </v-img>
    </v-container>
  </div>
</template>

<script>
//import axios from "axios";

export default {
  name: "MovieDetails",

  data: () => ({
    movieDetails:""
  }),

  computed: {
  
  },

  components: {},

  created() {
    this.movieDetails = JSON.parse(localStorage.getItem("clickedMovie"))
    console.log("Movie Details",this.movieDetails)
  },

  methods: {
   
  },
};
</script>
<style scoped>
</style>
