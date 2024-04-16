<template>
  <table>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="name-label" for="name-input">Name*: </label>
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
        <input class="inputfield" id="contracttype-input" v-model="contracttype" type="text">
      </td>
    </tr>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="profilelink-label" for="profilelink-input">Link zum Profil (Xing o.ä.): </label>
      </td>
      <td class="sec-col">
        <input class="inputfield" id="profilelink-input" v-model="profilelink" type="text">
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
  name: "InputFieldsCandidate",
  data() {
    return {
      name: "",
      region: "",
      contracttype: "",
      skills: "",
      profilelink: "",
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
    profilelink(newValue) {
      localStorage.setItem("candidate_profilelink", newValue)
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
</style>