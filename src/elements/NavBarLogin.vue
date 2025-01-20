<template>
  <div class="navbar">
    <button class="btn btn-primary login-button" @click="login()">Login</button>
  </div>
</template>

<script>
import {login} from "@/firebase-config";

export default {
  name: "NavBarLogin",
  methods: {
    login() {
      login()
      this.$cookies.set("token", localStorage.getItem("token"))
      this.$cookies.set("email", localStorage.getItem("email"))
      this.$cookies.set("permission", localStorage.getItem("permission"))
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      localStorage.removeItem("permission")
    }
  },
}
</script>

<style>
.login-button {
  margin-left: auto;
  margin-right: 30px;
}

.navbar {
  text-align: right;
}
</style>