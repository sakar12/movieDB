<template>
  <v-container style="background-color: black" fluid>
    <v-row no-gutters>
      <v-container>
        <v-row>
          <v-col cols="6">
            <div class="text-h4" style="color: white; font-weight: bold">
              {{ movieDetails.title }}
            </div>

            <div class="text-h7" style="color: white">
              {{ movieDetails.release_date | formatDate }}
              <span v-if="(movieDetails.adult = 'false')"> • PG 13</span>
              <span v-else> R-rated </span>
            </div>
          </v-col>
          <v-col cols="6" class="mt-2">
            <div
              class="text-right text-h7"
              style="color: white; font-weight: bold"
            >
              <span
                ><v-icon color="yellow darken-3">mdi-cards-heart</v-icon></span
              >
              Movie Rating
            </div>
            <div class="text-right text-h7" style="color: white">
              {{ movieDetails.vote_average }}/10 ({{ movieDetails.vote_count }})
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>

    <v-row>
      <v-col cols="10" sm="5">
        <v-img
          :src="`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`"
          class="mt-n3 ml-n2"
          height="450"
          contain
        />
      </v-col>
      <v-col cols="10" sm="7" >
        <div class="text-h5 mr-12 " style="color: white">
          {{ movieDetails.overview }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import axios from "axios";

export default {
  name: "MovieDetails",

  data: () => ({
    movieDetails: "",
  }),

  computed: {},

  components: {},

  created() {
    this.movieDetails = JSON.parse(localStorage.getItem("clickedMovie"));
    console.log("Movie Details", this.movieDetails);
  },

  methods: {},
};
</script>
<style scoped>
</style>
