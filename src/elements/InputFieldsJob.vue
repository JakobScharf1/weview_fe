<template>
  <div class="full-width-div">
    <BIconArrowLeftCircleFill class="back-icon" @click="$router.back()"/>
    <h1>Infos zum Job/Projekt</h1>
  </div>
  <table>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="project-label" for="project-input">Projekt-/Job-Titel*: </label>
      </td>
      <td class="sec-col">
        <input class="inputfield" v-model="project" type="text" id="project-input">
      </td>
    </tr>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="region-label" for="region-input">Region/Einsatzort: </label>
      </td>
      <td class="sec-col">
        <input class="inputfield" v-model="region" type="text" id="region-input">
      </td>
    </tr>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="contracttype-label" for="contracttype-input">Vertragsart*: </label>
      </td>
      <td class="sec-col">
        <select class="inputfield full-width" id="contracttype-input" v-model="contracttype">
          <option value="Freelance Projekt">Contract</option>
          <option value="Festanstellung">Perm</option>
        </select>
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
        <input class="inputfield" id="jobportal-input" v-model="jobportal" type="url" placeholder="https://wematch-jobs.de/...">
      </td>
    </tr>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="skills-label" for="skills-input">Skills*: </label>
      </td>
      <td class="sec-col">
        <textarea rows="2" cols="50" class="inputfield" id="skills-input" v-model="skills"></textarea>
      </td>
    </tr>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="descr-label" for="descr-input">Über das Projekt/den Job*: </label>
      </td>
      <td class="sec-col">
        <textarea rows="4" cols="50" class="inputfield" id="descr-input" v-model="descr"></textarea>
      </td>
    </tr>
  </table>
</template>

<script>
import {BIconArrowLeftCircleFill} from "bootstrap-icons-vue";

export default {
  name: "InputFieldsJob",
  components: {BIconArrowLeftCircleFill},
  data() {
    return {
      project: "",
      region: "",
      skills: "",
      jobportal: "",
      contracttype: "",
      salary: "",
      descr: ""
    }
  },
  watch: {
    project(newValue) {
      localStorage.setItem("job_project", newValue)
    },
    region(newValue) {
      localStorage.setItem("job_region", newValue)
    },
    contracttype(newValue) {
      localStorage.setItem("job_contracttype", newValue)
    },
    salary(newValue) {
      localStorage.setItem("job_salary", newValue)
    },
    jobportal(newValue) {
      localStorage.setItem("job_jobportal", newValue)
    },
    skills(newValue) {
      localStorage.setItem("job_skills", newValue)
    },
    descr(newValue) {
      localStorage.setItem("job_descr", newValue)
    },
  }
}

</script>

<style>
  textarea.inputfield {
    margin-bottom: 0;
    resize: vertical;
    height: 60px;
  }

  .first-col-infodata {
    width: fit-content;
    text-align: right;
    padding-right: 10px;
  }
</style>