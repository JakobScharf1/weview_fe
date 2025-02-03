<template>
  <NavBar />
  <div class="content">
    <div class="full-width-div">
      <BIconArrowLeftCircleFill class="back-icon" @click="$router.back()"/>
      <h1>Kontaktdaten</h1>
    </div>
    <table>
      <tr>
        <td class="first-col">
          <label class="contact-label" id="name-label" for="name">Name*: </label>
        </td>
        <td class="sec-col">
          <input class="inputfield" v-model="name" type="text">
        </td>
      </tr>
      <tr>
        <td class="first-col">
          <label class="contact-label" id="position-label" for="position">Position*: </label>
        </td>
        <td class="sec-col">
          <input class="inputfield" v-model="position" type="text">
        </td>
      </tr>
      <tr>
        <td class="first-col">
          <label class="contact-label" id="location-label" for="location">Standort*: </label>
        </td>
        <td class="sec-col">
          <input class="inputfield" v-model="location" type="text">
        </td>
      </tr>
      <tr>
        <td class="first-col">
          <label class="contact-label" id="tel-label" for="tel">Telefon*: </label>
        </td>
        <td class="sec-col">
          <input class="inputfield" id="tel-input" v-model="tel" type="tel">
        </td>
      </tr>
      <tr>
        <td class="first-col">
          <label class="contact-label" id="linkedin-label" for="linkedin">LinkedIn-Profil: </label>
        </td>
        <td class="sec-col">
          <input class="inputfield" id="linkedin-input" v-model="linkedin" type="url" placeholder="https://linkedin.com/...">
        </td>
      </tr>
    </table>

    <button class="btn-primary" id="weiter-button" @click="routerPush(); saveData()">Weiter</button>

  </div>
</template>

<script>
import {BIconArrowLeftCircleFill} from "bootstrap-icons-vue";
import NavBar from "@/elements/NavBar.vue";
import router from "@/router";
import {checkDb, saveUserData} from "@/services/DBService.js"

export default {
  name: "ContactData",
  data() {
    return {
      name: "",
      position: "",
      location: "",
      tel: "",
      linkedin: "",
      noDbData: false
    }
  },
  components: {
    NavBar,
    BIconArrowLeftCircleFill
  },
  methods: {
    routerPush() {
      if(this.inputValidator()){
        router.push("/infoData")
      }
    },
    saveData() {
      saveUserData(this.$cookies.get("token"), this.$cookies.get("email"))
    },

    inputValidator() {
      let telPattern = /^(\+?[0-9]+)$/;
      let urlPattern = /^(https):\/\/[^ "]+$/;

      if (this.name === "") {
        document.getElementById("name-label").style.color = "red"
      } else {
        document.getElementById("name-label").style.color = "white"
        localStorage.setItem("name", this.name)
      }
      if (this.position === "") {
        document.getElementById("position-label").style.color = "red"
      } else {
        document.getElementById("position-label").style.color = "white"
        localStorage.setItem("position", this.position)
      }
      if (this.location === "") {
        document.getElementById("location-label").style.color = "red"
      } else {
        document.getElementById("location-label").style.color = "white"
        localStorage.setItem("location", this.location)
      }
      if (this.tel === "" || !telPattern.test(this.tel)) {
        document.getElementById("tel-label").style.color = "red"
      } else {
        document.getElementById("tel-label").style.color = "white"
        localStorage.setItem("tel", this.tel)
      }
      if (!(this.linkedin === "") && !urlPattern.test(this.linkedin)) {
        document.getElementById("linkedin-label").style.color = "red"
      } else {
        document.getElementById("linkedin-label").style.color = "white"
        localStorage.setItem("linkedin", this.linkedin)
      }

      return !(this.name === "") && !(this.position === "") && !(this.location === "") && !(this.tel === "") && telPattern.test(this.tel) && ((this.linkedin === "") || urlPattern.test(this.linkedin));
    }
  },
  async mounted() {
    try {
      await checkDb(this.$cookies.get("token"), this.$cookies.get("email")).then(dbData => {
        if (dbData.name !== "undefined" && dbData !== null && dbData !== "exit") {
          this.name = dbData.name
          this.position = dbData.position
          this.location = dbData.location
          this.tel = dbData.tel
          this.linkedin = dbData.linkedin

          console.log(dbData.name + "\n" + dbData.position + "\n" + dbData.location + "\n" + dbData.tel + "\n" + dbData.linkedin)

          localStorage.setItem("name", this.name)
          localStorage.setItem("position", this.position)
          localStorage.setItem("location", this.location)
          localStorage.setItem("tel", this.tel)
          localStorage.setItem("linkedin", this.linkedin)
        } else if(dbData === null){
          this.noDbData = true
        }
      })
    } catch(error){
      console.error("Fehler beim Abrufen der Daten: ", error)
    }
  },
  watch: {
    name(newValue){
      localStorage.setItem("name", newValue)
    },
    position(newValue){
      localStorage.setItem("position", newValue)
    },
    location(newValue){
      localStorage.setItem("location", newValue)
    },
    tel(newValue){
      localStorage.setItem("tel", newValue)
    },
    linkedin(newValue){
      localStorage.setItem("linkedin", newValue)
    },
  },
}

</script>

<style>

.contact-label {
  color: white;
  font-size: large;
}

.inputfield {
  height: 30px;
  width: 330px;
  border: none;
  border-radius: 0;
  font-family: 'Jost-1', sans-serif;
  font-size: 1.15rem;
  margin-bottom: 4px;
}

.customselect {
  width: 334px;
  position: relative;
  font-family: 'Jost-1', sans-serif;
  height: 30px;
  margin-bottom: 6px;
}

.customselect select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  background-color: #fff;
  border: 1px solid #caced1;
  border-radius: 0;
  color: #000;
  cursor: pointer;
  font-family: 'Jost-1', sans-serif;
  font-size: 1.15rem;
  height: 32px;
}

.customselect::before,
.customselect::after {
  position: absolute;
  content: "";
  right: 1rem;
  pointer-events: none;
  font-family: 'Jost-1', sans-serif;
}

.customselect::before {
  top: 40%;
}

.customselect::after {
  content: "\25BC";
  position: absolute;
  top: 55%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 0.8rem;
  pointer-events: none;
}

table {
  margin-top: 50px;
}

.first-col {
  width: 20%;
  text-align: right;
  padding-right: 10px;
}

.sec-col {
  width: 60%;
}

</style>