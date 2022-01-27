<template>
  <v-container style="background-color: black" fluid>
    <v-row class="pt-0 mt-n8">
      <v-col cols="8" class="mt-4">
        <div class="headline mt-2 ml-3" style="font-weight: 500; color: white">
          Movie List
        </div>
      </v-col>
      <v-col class="mt-4 pl-15 pr-5 d-flex justify-end">
        <v-text-field
          class="ml-16"
          style="width: 77%"
          v-model="search"
          label="Search By Movie"
          append-icon="mdi-magnify"
          single-line
          hide-details
          outlined
          filled
          dense
          background-color="white"
        />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col
        order="1"
        class="pa-3"
        v-for="(items, i) in resultQuery"
        md="3"
        :key="i"
      >
        <v-card
          :loading="loading"
          class="mx-auto"
          max-width="374"
          max-height="570"
        >
          <template slot="progress">
            <v-progress-linear
              color="deep-purple"
              height="10"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-container fluid>
            <v-img
              height="450"
              cover
              :src="`https://image.tmdb.org/t/p/w500${items.poster_path}`"
            >
              <v-app-bar flat color="rgba(0, 0, 0, 0)">
                <v-spacer></v-spacer>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color="white"
                      v-bind="attrs"
                      v-on="on"
                      style="background-color: #707070; border-radius: 50px"
                      >mdi-dots-horizontal</v-icon
                    >
                  </template>
                  <v-list>
                    <v-list-item @click="viewDetails(items)" class="pl-2">
                      <v-icon medium color="black" class="pr-1">
                        mdi-newspaper-variant
                      </v-icon>
                      <v-list-item-title dense style="color: black">
                        {{ "View More" }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="editName()" class="pl-2">
                      <v-icon medium color="black" class="pr-1">
                        mdi-pencil
                      </v-icon>
                      <v-list-item-title dense style="color: black">
                        {{ "Edit Name" }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-app-bar>
            </v-img>
          </v-container>
          <v-card-title
            class="mt-n6 d-inline-block text-truncate"
            :search="search"
          >
            {{ items.title }}</v-card-title
          >

          <v-card-text>
            <v-row align="center" class="mx-0">
              <v-rating
                :value="items.vote_average / 2"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <div class="grey--text ml-1">
                {{ items.vote_average }} ({{ items.vote_count }})
              </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              Release Date : {{ items.release_date | formatDate }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Movies",

  data: () => ({
    trendingMovie: [],
    search: "",
    movieGenreList: {},
    filteredMovieGenreList: ["All"],
    genreListvmodel: "",
    selectedGenre: "",
  }),

  computed: {
    resultQuery() {
      if (this.search) {
        return this.trendingMovie.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        return this.trendingMovie;
      }
    },
  },

  components: {},

  created() {
    this.listTrendingMovies();
    this.configurationAPI();
    this.listMovieGenres();
    this.resultQuery();
  },

  methods: {
    listTrendingMovies() {
      axios.get(`${process.env.VUE_APP_TRENDING_MOVIE}`).then((res) => {
        this.trendingMovie = res.data.results;
      });
    },
    configurationAPI() {
      axios.get(`${process.env.VUE_APP_CONFIGURATION_API}`).then((res) => {
      });
    },
    listMovieGenres() {
      axios.get(`${process.env.VUE_APP_MOVIE_GENRE_LIST}`).then((res) => {
        this.movieGenreList = res.data.genres;
        for (var i = 0; i < this.movieGenreList.length; i++) {
          this.filteredMovieGenreList.push(this.movieGenreList[i].name);
        }
      });
    },

    viewDetails(movieID) {
      localStorage.setItem("clickedMovie", JSON.stringify(movieID));
      this.$router.push("/movieDetails");
    },
  },
};
</script>
<style scoped>
</style>
