<template>
  <NavBar />
  <div class="content">
    <h1>Wähle aus, was für ein Video du versenden willst.</h1>

    <div class="choose-buttons-container centered" id="first-one">
      <div class="choose-button" id="button-candidate" @click="setActive('button-candidate')">
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
      <div class="choose-button" id="button-job" @click="setActive('button-job')">
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
      <div class="choose-button" id="button-personal" @click="setActive('button-personal')">
        <div class="choose-button-icon-div centered">
          <BIconPersonSquare class="choose-button-icon"/>
        </div>
        <div class="choose-button-text-div centered">
          <h2>Persönliche Vorstellung und Vorstellung von WeMatch</h2>
        </div>
      </div>
    </div>

    <button class="btn-primary" id="weiter-button">Weiter</button>

  </div>
</template>

<script>
import NavBar from "@/elements/NavBar.vue";
import {BIconPerson, BIconBriefcase, BIconPersonSquare} from "bootstrap-icons-vue";

export default {
  name: "ChooseViewType",
  components: {
    NavBar,
    BIconPerson,
    BIconBriefcase,
    BIconPersonSquare
  },
  methods: {
    setActive(buttonId) {
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
    }
  }
}
</script>

<style>

hr {
  width: 500px;
  border-width: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  margin: 0;
  padding: 0;
}

.centered {
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}

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

#weiter-button {
  margin-top: 50px;
}

</style>