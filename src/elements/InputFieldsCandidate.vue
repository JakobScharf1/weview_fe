<template>
  <div class="full-width-div">
    <BIconArrowLeftCircleFill class="back-icon" @click="$router.back()"/>
    <h1>Infos zum Kandidaten</h1>
  </div>
  <table>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="name-label" for="name-input">Vorname*: </label>
      </td>
      <td class="sec-col">
        <input class="inputfield" v-model="name" type="text" id="name-input">
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
          <option value="Contract/Freelance">Contract</option>
          <option value="Perm">Perm</option>
        </select>
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
        <label class="contact-label" id="descr-label" for="descr-input">Weitere Informationen: </label>
      </td>
      <td class="sec-col">
        <textarea class="inputfield" id="descr-input" v-model="descr"></textarea>
      </td>
    </tr>
  </table>
</template>

<script>
import {BIconArrowLeftCircleFill} from "bootstrap-icons-vue";

export default {
  name: "InputFieldsCandidate",
  components: {BIconArrowLeftCircleFill},
  data() {
    return {
      name: "",
      region: "",
      contracttype: "",
      skills: "",
      descr: ""
    }
  },
  watch: {
    name(newValue) {
      localStorage.setItem("candidate_name", newValue)
    },
    region(newValue) {
      localStorage.setItem("candidate_region", newValue)
    },
    contracttype(newValue) {
      localStorage.setItem("candidate_contracttype", newValue)
    },
    skills(newValue) {
      localStorage.setItem("candidate_skills", newValue)
    },
    descr(newValue) {
      localStorage.setItem("candidate_descr", newValue)
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

.full-width {
  width: 100%;
}
</style>