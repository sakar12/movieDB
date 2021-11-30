<template>
  <v-app> 
    <v-navigation-drawer v-model="drawer" app fixed color="black" dark>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Movie DB </v-list-item-title>
          <v-list-item-subtitle> Movies and Tv show information </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item-group>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.href"
            link
            color="white"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="black " dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title></v-toolbar-title>
    </v-app-bar>

    <v-main style="background-color:black;">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  
  name: "App",

  data: () => ({
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home", path: "/",href:"/" },
      { title: "Movies", icon: "mdi-movie-play", href:"/movies" },
      { title: "Tv Shows", icon: "mdi-movie-star", href:"/tvshows" },
      { title: "History", icon: "mdi-history", href:"/history" },
    ],
    right: null,
  }),
};
</script>
