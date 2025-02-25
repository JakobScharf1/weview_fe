<template>
  <div class="full-width-div">
    <BIconArrowLeftCircleFill class="back-icon" @click="$router.back()"/>
    <h1>Infos zu Dir</h1>
  </div>
  <table>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="branche-label" for="branche-input">Markt*: </label>
      </td>
      <td class="sec-col">
        <input class="inputfield" v-model="branche" type="text" id="branche-input">
      </td>
    </tr>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="region-label" for="region-input">Region*: </label>
      </td>
      <td class="sec-col">
        <input class="inputfield" v-model="region" type="text" id="region-input">
      </td>
    </tr>
    <tr>
      <td class="first-col-infodata">
        <label class="contact-label" id="contracttype-label" for="contracttype-input">Vertragsart/-en*: </label>
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
        <label class="contact-label" id="descr-label" for="descr-input">Sonstiges: </label>
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
  name: "InputFieldsPersonal",
  components: {BIconArrowLeftCircleFill},
  data() {
    return {
      branche: "",
      region: "",
      contracttype: "",
      descr: ""
    }
  },
  watch: {
    branche(newValue) {
      localStorage.setItem("personal_branche", newValue)
    },
    region(newValue) {
      localStorage.setItem("personal_region", newValue)
    },
    contracttype(newValue) {
      localStorage.setItem("personal_contracttype", newValue)
    },
    descr(newValue) {
      localStorage.setItem("personal_descr", newValue)
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