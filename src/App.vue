<template>
  <div id="app">
    <Nav />
    <div id="router-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
export default {
  name: "App",
  components: {
    Nav
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
#router-view {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 0px !important;
}
.logo {
  height: 100%;
  width: 100%;
  max-width: 530px;
}
</style>
