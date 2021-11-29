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
                  Tv Show List
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
                    v-model="selectedStatus"
                    :items="statusList"
                    :menu-props="{ maxHeight: '400' }"
                    label="Filter By Genre"
                    persistent-hint
                    outlined
                    dense
                    hide-details
                    background-color="white"
                  />
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
          v-for="(items, i) in trendingTV"
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
                      <v-list-item @click="viewDetails()" class="pl-2">
                        <v-icon medium color="black" class="pr-1">
                          mdi-newspaper-variant
                        </v-icon>
                        <v-list-item-title dense style="color: black">
                          {{ "View More" }}
                        </v-list-item-title>
                      </v-list-item>
                      <v-list-item @click="viewDetails()" class="pl-2">
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
              class="mt-n6"
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ items.name }}</v-card-title
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
                First Air Date : {{ items.first_air_date | formatDate }}
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
  name: "Tv Shows",

  data: () => ({
    trendingTV: [],
  }),

  components: {},

  created() {
    this.listTrendingTV();
    this.configurationAPI();
  },

  methods: {
    listTrendingTV() {
      axios.get(`${process.env.VUE_APP_TRENDING_TV}`).then((res) => {
        this.trendingTV = res.data.results;
        console.log("Trending TV list", this.trendingTV);
        console.log("Data of trending TV", res);
      });
    },
    configurationAPI() {
      axios.get(`${process.env.VUE_APP_CONFIGURATION_API}`).then((res) => {
        console.log("Data of configuration", res);
      });
    },
  },
};
</script>
<style scoped>
</style>
