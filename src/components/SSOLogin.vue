<template>
  <NavBarLogin @update:isLoading="handleLoader" />
  <div class="logo-container">
    <img src="../assets/weview-logo.png" class="logo-big" />
  </div>
</template>

<script>
import NavBarLogin from "@/elements/NavBarLogin.vue";

export default {
  name: "SSOLogin",
  components: {
    NavBarLogin
  },
}
</script>

<style>
.logo-container {
  position: relative;
}

.logo-big {
  position: absolute;
  top: 15rem;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: auto;
}

</style>