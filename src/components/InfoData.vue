<template>
  <UserVerification />
  <NavBar />
  <div class="content">

    <div v-if="this.viewType === 'job'"><InputFieldsJob /></div>
    <div v-if="this.viewType === 'candidate'"><InputFieldsCandidate /></div>
    <div v-if="this.viewType === 'personal'"><InputFieldsPersonal /></div>

    <p v-if="error" class="error-text">Bitte fühle alle Pflichtfelder aus!</p>
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
import UserVerification from "@/elements/UserVerification.vue";

export default {
  name: "InfoData",
  data() {
    return {
      viewType: localStorage.getItem("view-type"),
      error: false
    }
  },
  components: {
    UserVerification,
    InputFieldsCandidate,
    InputFieldsJob,
    InputFieldsPersonal,
    NavBar
  },
  methods: {
    submit() {
      if(localStorage.getItem("view-type") === "job"){
        if(localStorage.getItem("job_project") != null &&
            localStorage.getItem("job_contracttype") != null &&
            localStorage.getItem("job_skills") != null &&
            localStorage.getItem("job_descr") != null
        ) {
          BackendService.generateHTML(this.$cookies.get("token"), this.$cookies.get("email")).then(response => {
            console.log("generateHTML Response: ", response)
            localStorage.setItem("viewLink", response)

            router.push("/success")
          });
        } else {
          this.error = true
        }
      } else if(localStorage.getItem("view-type") === "personal"){
        if(localStorage.getItem("personal_branche") != null &&
            localStorage.getItem("personal_region") != null &&
            localStorage.getItem("personal_contracttype") != null
        ) {
          BackendService.generateHTML(this.$cookies.get("token"), this.$cookies.get("email")).then(response => {
            console.log("generateHTML Response: ", response)
            localStorage.setItem("viewLink", response)

            router.push("/success")
          });
        } else {
          this.error = true
        }
      } else if(localStorage.getItem("view-type") === "candidate"){
        if(localStorage.getItem("candidate_name") != null &&
            localStorage.getItem("candidate_contracttype") != null &&
            localStorage.getItem("candidate_skills") != null
        ) {
          BackendService.generateHTML(this.$cookies.get("token"), this.$cookies.get("email")).then(response => {
            console.log("generateHTML Response: ", response)
            localStorage.setItem("viewLink", response)

            router.push("/success")
          });
        } else {
          this.error = true
        }
      }
    }
  },
}
</script>

<style>
.error-text {
  color: red;
  margin: 0;
}
</style>