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
    }
  }
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