<template>
    <div class="background"></div>
    <RouterView/>
</template>

<script>
import router from "@/router";

export default {
  name: 'App',
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    router() {
      return router
    },
    clearLocalStorage() {
      localStorage.clear();
    }
  },
  created() {
    window.addEventListener('beforeunload', this.clearLocalStorage)
    console.log("Backend URL: ", process.env.VUE_APP_BACKEND_URL)
  },
  unmounted() {
    window.addEventListener('beforeunload', this.clearLocalStorage)
  }
}
</script>

<style>
@import './assets/font.css';

body {
  background-color: #001F25;
  font-family: 'Jost-1', sans-serif;
}

h1 {
  color: white;
  text-align: center;
  font-family: 'Jost-3', sans-serif;
  margin: 0;
}

h2 {
  color: white;
  font-weight: normal;
}

.background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 600px;
  height: 400px;
  background-image: url('../../weview_be/src/main/resources/background.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left bottom;
  z-index: -1;
}

.content{
  margin: 7rem 12rem 0 12rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.full-width-div {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-primary {
  padding: 7px 35px;
  border-radius: 0;
  border: 0;
  font-family: 'Jost-3', sans-serif;
  font-size: large;
  background-color: white;
  height: fit-content;
}

.btn-primary:hover {
  box-shadow: 0px 0px 10px white;
  cursor: pointer;
}

.btn-primary-outline {
  height: fit-content;
  padding: 7px 35px;
  border-radius: 0;
  border: 1px solid #fff;
  font-family: 'Jost-3', sans-serif;
  font-size: large;
  color: white;
  background-color: transparent;
}

.btn-primary-outline:hover {
  background-color: white;
  box-shadow: 0px 0px 10px white;
  cursor: pointer;
  color: black
}

.back-icon {
  color: white;
  height: 25px;
  width: auto;
  margin-right: 10px;
}

.back-icon:hover {
  border-radius: 15px;
  box-shadow: 0px 0px 10px white;
  cursor: pointer;
}

.hinweistext {
  color: darkgray;
  font-size: small;
}


hr {
  width: 500px;
  border-width: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0;
  padding: 0;
}

.centered {
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}


</style>
