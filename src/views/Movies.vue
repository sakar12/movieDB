<template>
  <div style="background-color: black">
    <v-container fluid>
      <v-row row wrap class="pt-0 mt-n8">
        <v-col class="mt-4">
          <v-row row wrap>
            <v-col>
              <div>
                <div
                  class="headline mt-2 ml-3"
                  style="font-weight: 500; color: white"
                >
                  Movie List
                </div>
              </div>
            </v-col>

            <v-col class="text-right mr-n2">
              <v-row>
                <v-col>
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
                <v-col>
                  <v-select
                    class="mr-5"
                    v-model="selectedGenre"
                    :items="filteredMovieGenreList"
                    :menu-props="{ maxHeight: '400' }"
                    label="Filter By Genre"
                    persistent-hint
                    outlined
                    dense
                    hide-details
                    background-color="white"
                  />
                  <!-- <v-btn
              color="primary"
              @click="filterClicked"
              class="whiteTextInButton ml-0 mr-n2"
            >
              <v-icon class="mr-2" small>mdi-filter</v-icon>
              {{ "Filter" }}
            </v-btn> -->
                </v-col>
              </v-row>
            </v-col>
          </v-row>
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

              <!-- <div
                style="
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              >
                {{ items.overview }}
              </div> -->
            </v-card-text>

            <!--  <v-divider class="mx-4"></v-divider> -->

            <!-- <v-card-actions>
              <v-btn color="deep-purple lighten-2" text @click="reserve">
                View Details
              </v-btn>
               <v-btn color="deep-purple lighten-2" text @click="reserve">
                Edit
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-col>
      </v-row>

      <!-- <template v-if="resultQuery == 0">
        <v-container fluid style="background-color: black; margin-top: 15%">
          <v-img
            class="mx-auto"
            width="100"
            height="100"
            src="@/assets/noresult.png"
          />
          <h1 class="text-center" style="color: grey">No results Found</h1>
        </v-container>
      </template> -->

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
import axios from "axios";

export default {
  name: "Movies",

  data: () => ({
    trendingMovie: [],
    search: "",
    movieGenreList: {},
    filteredMovieGenreList: ["All"],
    genreListvmodel: "",
    selectedGenre:""
  }),

  computed: {
  resultQuery(){
      if(this.search){
      return this.trendingMovie.filter((item)=>{
        return this.search.toLowerCase().split(' ').every(v => item.title.toLowerCase().includes(v))
      })
      }else{
        return this.trendingMovie;
      }
    } 
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
        console.log("Trending movie list", this.trendingMovie);
        //console.log("Data of treding movie", res);
      });
    },
    configurationAPI() {
      axios.get(`${process.env.VUE_APP_CONFIGURATION_API}`).then((res) => {
        //console.log("Data of configuration", res);
      });
    },
    listMovieGenres() {
      axios.get(`${process.env.VUE_APP_MOVIE_GENRE_LIST}`).then((res) => {
        this.movieGenreList = res.data.genres;
        //console.log("Movie Genre List", this.movieGenreList);
        for (var i = 0; i < this.movieGenreList.length; i++) {
          this.filteredMovieGenreList.push(this.movieGenreList[i].name);
        }
        //console.log("Status List", this.filteredMovieGenreList);
        //console.log("Response of genre movie", res);
      });
    },

    viewDetails(movieID){
      localStorage.setItem("clickedMovie",JSON.stringify(movieID))
      this.$router.push("/movieDetails");
    }
    /* filterClicked() {
     // console.log("selected status", this.selectedGenre);
      if (this.selectedGenre == "All"){
        this.listTrendingMovies()
      } else {
      this.filterMovieByGenre();
      }
    },

    filterMovieByGenre(){
       axios.get(`${process.env.VUE_APP_TRENDING_MOVIE}`).then((res) => {
         this.trendingMovie = res.data.results;
        //console.log(res);
        for (var m = 0; m < this.trendingMovie.length; m++) {
          this.filteredMovieGenreList.push(this.trendingMovie[m].genre_ids);
        }
         console.log("Status List", this.filteredMovieGenreList);
        console.log("filter logic", this.selectedGenre, this.trendingMovie); 

        this.selectedFilterList = [];
        this.selectedFilterList.push(this.selectedGenre);
        console.log(this.selectedFilterList);
        this.tableFilteredList = [];
        for (var n = 0; n < this.trendingMovie.length; n++) {
          console.log(Object.values(this.trendingMovie[n]));
          for (var o = 0; o < this.selectedFilterList.length; o++) {
            if (
              Object.values(this.trendingMovie[n]).includes(
                this.selectedFilterList[o]
              )
            ) {
              console.log(
                this.selectedFilterList[o],
                "is there in",
                this.trendingMovie[n]
              );
              this.tableFilteredList.push(this.trendingMovie[n]);
            }
          }
        }
        console.log("Table FIlterd List", this.tableFilteredList);
        const result = [];
        const map = new Map();
        for (const item of this.tableFilteredList) {
          if (!map.has(item.id)) {
            map.set(item.id, true);
            result.push(item);
          }
        }
        console.log("Result", result);
        this.trendingMovie = [];
        this.trendingMovie = result;
      });
    } */
  },
};
</script>
<style scoped>
</style>
