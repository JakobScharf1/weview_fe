<template>
  <NavBar />
  <div class="content">
    <div class="full-width-div">
      <BIconArrowLeftCircleFill class="back-icon" @click="$router.back()"/>
      <h1>Individuelle Informationen</h1>
    </div>

    <div v-if="this.viewType === 'job'"><InputFieldsJob /></div>
    <div v-if="this.viewType === 'candidate'"><InputFieldsCandidate /></div>
    <div v-if="this.viewType === 'personal'"><InputFieldsPersonal /></div>

    <button class="btn-primary" id="weiter-button" @click="routerPush()">Weiter</button>

  </div>
</template>

<script>

import {defineComponent} from "vue";
import NavBar from "@/elements/NavBar.vue";
import {BIconArrowLeftCircleFill} from "bootstrap-icons-vue";
import InputFieldsJob from "@/elements/InputFieldsJob.vue";
import router from "@/router";
import InputFieldsCandidate from "@/elements/InputFieldsCandidate.vue";

export default defineComponent({
  name: "InfoData",
  data() {
    return {
      viewType: localStorage.getItem("view-type"),
    }
  },
  components: {
    InputFieldsCandidate,
    InputFieldsJob,
    BIconArrowLeftCircleFill,
    NavBar
  },
  methods: {
    routerPush() {
      router.push("/infoData");
    }
  },
  beforeMount() {
    localStorage.setItem("view-type", "job")
  }
})
</script>

<style>

</style>