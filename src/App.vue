<template>
  <div id="app">
    <header-cp />     <!-- Header of your site -->
    <router-view />   <!-- Dynamically updated by the router -->
    <footer-cp />     <!-- You guessed it, the footer -->
  </div>
</template>

<script>
import headerCp from './views/Header'
import footerCp from './views/Footer'

export default {
  name: 'App',
  components: {
    headerCp,
    footerCp
  }
}
</script>

<style>
/* Imports Unity CSS base files */
@import "../public/css/em-unity-1.6.0.min.css";

[v-cloak] {
  display: none;
}

#app {
  /* Flex configuration to place header and footer correctly */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
}

/* Enables content to be aligned to top on pages that do not require scroll */
.main {
  flex-grow: 1;
  width: 100%;
}
</style>
