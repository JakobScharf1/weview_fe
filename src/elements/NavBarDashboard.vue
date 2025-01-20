<template>
  <div class="navbar">
    <img class="logo" src="../assets/weview-logo.png" alt="WeMatch Logo">
    <button class="btn-primary logout-button" @click="logout()">Logout</button>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "NavBar",
  methods: {
    logout() {
      localStorage.clear()
      this.$cookies.remove("token")
      this.$cookies.remove("email")
      this.$cookies.remove("permission")
      router.push("/login")
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