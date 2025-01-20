<template>
  <div class="navbar">
    <button class="btn btn-primary login-button" @click="login()">Login</button>
  </div>
</template>

<script>
import {login} from "@/firebase-config";
import router from "@/router";

export default {
  name: "NavBarLogin",
  methods: {
    async login() {
      await login().then((permission) => {
        if(permission !== "0"){
          this.$cookies.set("permission", permission)
          this.$cookies.set("token", localStorage.getItem("token"))
          this.$cookies.set("email", localStorage.getItem("email"))
          router.push("/home")
        }
      })
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