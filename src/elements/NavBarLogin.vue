<template>
  <div class="navbar">
    <button class="btn btn-primary" @click="login()">Login</button>
  </div>
</template>

<script>
import {login} from "@/firebase-config";

export default {
  name: "NavBarLogin",
  methods: {
    login() {
      login();
    }
  }
}
</script>

<style>
button {
  margin-left: auto;
  margin-right: 30px;
}

.navbar {
  text-align: right;
}
</style>