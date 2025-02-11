<template>
  <div class="empty-div"></div>
</template>

<script>
import BackendService from "@/services/BackendService";
import {useRoute} from "vue-router";
import router from "@/router";

export default {
  beforeMount() {
    const token = this.$cookies.get("token")
    const route = useRoute().fullPath
    if(route !== "/login"){
      if(token !== null) {
        if(!BackendService.verify(token)){
          console.log("token could not be verified")
          router.push("/login")
        }
      } else {
        console.log("token is empty or null")
        router.push("/login")
      }
    }
  }
}
</script>

<style>
.empty-div {
  display: none;
}
</style>