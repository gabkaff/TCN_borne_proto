<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// App principal - le router gère les vues
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #ffffff;
  color: #333;
}

#app {
  min-height: 100vh;
}

/* Touch-friendly pour bornes et iPads */
button, a {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
</style>
