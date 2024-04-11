<template>
  <div class="main-container">
    <div class="background"></div>
    <RouterView/>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'App',
  methods: {
    router() {
      return router
    }
  }
}
</script>

<style>
@import './assets/font.css';

body {
  background-color: #001F25;
  font-family: 'Jost-1', sans-serif;
  height: 100vh;
  margin: 0;
}

h1 {
  color: white;
  text-align: center;
}

h2 {
  color: white;
  font-weight: normal;
}

#app {
  height: 100vh;
}

.main-container {
  position: relative;
  height: 100vh;
}

.background {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 600px;
  height: 400px;
  background-image: url('./assets/background.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-origin: content-box;
}

.content{
  padding: 7rem 12rem 0 12rem;
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
  width: 100%;
  display: flex;
  justify-content: center;
}

.btn-primary {
  padding: 7px 35px;
  border-radius: 0;
  border: 0;
  font-family: 'Jost-3', sans-serif;
  font-size: large;
}

.btn-primary:hover {
  box-shadow: 0px 0px 10px white;
  cursor: pointer;
}

.btn-primary-outline {
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

</style>
