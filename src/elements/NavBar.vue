<template>
  <div class="navbar">
    <img class="logo" src="../assets/weview-logo.png" alt="WeMatch Logo">
    <button class="btn-primary-outline dashboard-button" @click="$router.push('/home')">Dashboard</button>
    <button class="btn-primary logout-button" @click="logout()">Logout</button>
  </div>
</template>

<script>
import {logout} from "@/firebase-config";

export default {
  name: "NavBar",
  methods: {
    logout() {
      logout()
    }
  }
}
</script>

<style>

.dashboard-button {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.logout-button {
  margin-left: 15px;
}

.logo {
  max-height: 140%;
  width: auto;
  margin-left: 10px;
}

</style>