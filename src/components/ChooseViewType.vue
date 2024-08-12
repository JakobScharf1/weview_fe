<template>
  <NavBar />
  <div class="content">
    <div class="full-width-div">
      <BIconArrowLeftCircleFill class="back-icon" @click="$router.back()"/>
      <h1>Wähle aus, was für ein Video du versenden willst.</h1>
    </div>

    <div class="choose-buttons-container centered" id="first-one">
      <div class="choose-button" id="button-candidate" :class="{ 'active': activeButton === 'candidate' }"  @click="setActive('button-candidate')">
        <div class="choose-button-icon-div centered">
          <BIconPerson class="choose-button-icon"/>
        </div>
        <div class="choose-button-text-div centered">
          <h2>Vorstellung eines Kandidats</h2>
        </div>
      </div>
    </div>

    <hr />

    <div class="choose-buttons-container centered">
      <div class="choose-button" id="button-job" :class="{ 'active': activeButton === 'job' }" @click="setActive('button-job')">
        <div class="choose-button-icon-div centered">
          <BIconBriefcase class="choose-button-icon"/>
        </div>
        <div class="choose-button-text-div centered">
          <h2>Vorstellung eines Jobs</h2>
        </div>
      </div>
    </div>

    <hr />

    <div class="choose-buttons-container centered">
      <div class="choose-button" id="button-personal" :class="{ 'active': activeButton === 'personal' }" @click="setActive('button-personal')">
        <div class="choose-button-icon-div centered">
          <BIconPersonSquare class="choose-button-icon"/>
        </div>
        <div class="choose-button-text-div centered">
          <h2>Persönliche Vorstellung und Vorstellung von WeMatch</h2>
        </div>
      </div>
    </div>
    <span id="error">Bitte wähle eine Option aus.</span>
    <button class="btn-primary" id="weiter-button" @click="routerPush()">Weiter</button>

  </div>
</template>

<script>
import NavBar from "@/elements/NavBar.vue";
import {BIconPerson, BIconBriefcase, BIconPersonSquare, BIconArrowLeftCircleFill} from "bootstrap-icons-vue";
import router from "@/router";

export default {
  name: "ChooseViewType",
  data() {
    return {
      activeButton: null
    }
  },
  components: {
    BIconArrowLeftCircleFill,
    NavBar,
    BIconPerson,
    BIconBriefcase,
    BIconPersonSquare
  },
  methods: {
    setActive(buttonId) {
      this.activeButton = buttonId;
      const buttons = document.querySelectorAll('.choose-button');
      buttons.forEach(button => {
        button.classList.remove('active');
      });
      const selectedButton = document.getElementById(buttonId);
      if (selectedButton) {
        selectedButton.classList.add('active');
      }
      if(buttonId === "button-candidate"){
        localStorage.setItem("view-type", "candidate")
      } else if(buttonId === "button-job"){
        localStorage.setItem("view-type", "job")
      } else if(buttonId === "button-personal"){
        localStorage.setItem("view-type", "personal")
      }
    },

    routerPush(){
      if(localStorage.getItem("view-type") !== null){
        document.getElementById("error").style.display = "none";
        router.push('/dataUpload')
      } else {
        document.getElementById("error").style.display = "inline";
      }
    }
  },
  created() {
    switch(localStorage.getItem("view-type")) {
      case "candidate":
        this.activeButton = "candidate";
        break;
      case "job":
        this.activeButton = "job";
        break;
      case "personal":
        this.activeButton = "personal";
        break;
    }
  }
}
</script>

<style>
.choose-buttons-container {
  width: 100%;
}

.choose-button {
  width: 500px;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  //justify-content: space-evenly;
  align-items: center;
  background-color: transparent;
}

.choose-button:hover,
.choose-button.active {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.choose-button-icon-div {
  height: 100px;
  width: 200px;
}

.choose-button-icon {
  vertical-align: middle;
  height: 3em;
  width: 3em;
  color: white;
}

.choose-button-text-div {
  text-align: center;
  height: 100px;
  width: 100%;
}

#first-one {
  margin-top: 50px;
}

#error {
  color: red;
  display: none;
}

#weiter-button {
  margin-top: 50px;
}

</style>