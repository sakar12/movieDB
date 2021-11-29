import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Movies from "../views/Movies.vue";
import TvShows from "../views/TvShows.vue";
import History from "../views/History.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies,
  },

  {
    path: "/tvshows",
    name: "TvShows",
    component: TvShows,
  },

  {
    path: "/history",
    name: "Histoy",
    component: History,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
