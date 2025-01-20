<template>
  <NavBar />
  <div class="content">

    <div v-if="this.viewType === 'job'"><InputFieldsJob /></div>
    <div v-if="this.viewType === 'candidate'"><InputFieldsCandidate /></div>
    <div v-if="this.viewType === 'personal'"><InputFieldsPersonal /></div>

    <button class="btn-primary" id="weiter-button" @click="submit()">Weiter</button>

  </div>
</template>

<script>
import NavBar from "@/elements/NavBar.vue";
import InputFieldsJob from "@/elements/InputFieldsJob.vue";
import router from "@/router";
import InputFieldsCandidate from "@/elements/InputFieldsCandidate.vue";
import InputFieldsPersonal from "@/elements/InputFieldsPersonal.vue";
import BackendService from "@/services/BackendService";

export default {
  name: "InfoData",
  data() {
    return {
      viewType: localStorage.getItem("view-type"),
    }
  },
  components: {
    InputFieldsCandidate,
    InputFieldsJob,
    InputFieldsPersonal,
    NavBar
  },
  methods: {
    submit() {
      BackendService.generateHTML().then(response => {
        console.log("generateHTML Response: ", response)
        localStorage.setItem("viewLink", response)

        BackendService.generateGIF().then(response => {
          console.log("generateGIF Response: ", response)
          localStorage.setItem("GIF", response)
        })

        router.push("/success")
      });
    }
  },
}
</script>

<style>

</style>