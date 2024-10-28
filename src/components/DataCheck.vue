<template>
  <NavBar />
  <div class="content">
    <div class="full-width-div">
      <BIconArrowLeftCircleFill class="back-icon" @click="$router.back()"/>
      <h1>Prüfe deine Angaben</h1>
    </div>
    <table>
      <tr>
        <td class="first-col-infodata">
          <span class="contact-label">View-Art: </span>
        </td>
        <td class="sec-col">
          <span style="color:white">{{ viewType }}</span>
        </td>
      </tr>
      <tr>
        <td class="first-col-infodata">
          <span class="contact-label">Video: </span>
        </td>
        <td class="sec-col">
          <a href="">{{ video }}</a>
        </td>
      </tr>
      <tr>
        <td class="first-col-infodata">
          <span class="contact-label">Portraitbild: </span>
        </td>
        <td class="sec-col">
          <a href="">{{ portrait }}</a>
        </td>
      </tr>
      <tr>
        <td class="first-col-infodata">
          <label class="contact-label" id="salary-label" for="salary-input">Gehalt: </label>
        </td>
        <td class="sec-col">
          <input class="inputfield" id="salary-input" v-model="salary" type="text">
        </td>
      </tr>
      <tr>
        <td class="first-col-infodata">
          <label class="contact-label" id="jobportal-label" for="jobportal-input">Link zum Job im Job-Portal: </label>
        </td>
        <td class="sec-col">
          <input class="inputfield" id="jobportal-input" v-model="jobportal" type="url" placeholder="https://career-portal.wematch-intern.de/...">
        </td>
      </tr>
      <tr>
        <td class="first-col-infodata">
          <label class="contact-label" id="skills-label" for="skills-input">Skills*: </label>
        </td>
        <td class="sec-col">
          <textarea class="inputfield" id="skills-input" v-model="skills"></textarea>
        </td>
      </tr>
      <tr>
        <td class="first-col-infodata">
          <label class="contact-label" id="descr-label" for="descr-input">Über das Projekt/den Job*: </label>
        </td>
        <td class="sec-col">
          <textarea class="inputfield" id="descr-input" v-model="descr"></textarea>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

import NavBar from "@/elements/NavBar.vue";
import {BIconArrowLeftCircleFill} from "bootstrap-icons-vue";

export default {
  name: 'DataCheck',
  data() {
    return {
      viewType: localStorage.getItem("view-type"),
      video: localStorage.getItem("video"),
      portrait: localStorage.getItem("portrait"),
    }
  },
  components: {
    BIconArrowLeftCircleFill,
    NavBar,
  },
  created() {
    if(this.viewType === "candidate"){
      this.viewType = "Vorstellung eines Kandidats"
    } else if(this.viewType === "job"){
      this.viewType = "Vorstellung eines Jobs"
    } else if(this.viewType === "personal"){
      this.viewType = "Persönliche Vorstellung und Vorstellung von WeMatch"
    }
  }
}
</script>

<style>
textarea.inputfield {
  margin-bottom: 0;
  resize: vertical;
}

.first-col-infodata {
  width: fit-content;
  text-align: right;
  padding-right: 10px;
}
</style>