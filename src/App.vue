<template>
  <v-app>
    <Header />
    <v-main style="background-color: black">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",

  data: () => ({}),
  components: {
    Header,
  },
};
</script>
