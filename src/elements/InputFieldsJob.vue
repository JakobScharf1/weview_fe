<template>
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
        <input class="inputfield" id="contracttype-input" v-model="contracttype" type="text">
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
</template>

<script>
export default {
  name: "InputFieldsJob",
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
  }

  .first-col-infodata {
    width: fit-content;
    text-align: right;
    padding-right: 10px;
  }
</style>