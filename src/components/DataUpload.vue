<template>
  <UserVerification />
  <NavBar />
  <div class="content">
    <div class="full-width-div">
        <BIconArrowLeftCircleFill class="back-icon" @click="$router.back()"/>
        <h1>Datei-Upload</h1>
    </div>

    <div class="dataupload-container centered" id="first-one">
      <div class="upload-button">
        <div class="upload-button-icon-div centered">
          <BIconCameraVideo class="upload-button-icon"/>
        </div>
        <div class="upload-button-text-div centered">
          <label for="video" id="video-button" :class="{ 'btn-primary-outline upload-complete' : finished_v, 'btn-primary' : !finished_v }"><span v-if="!this.isLoading">
            Video hochladen
          </span>
            <beat-loader v-if="this.isLoading" color="#000"></beat-loader>
          </label>
          <input v-if="!this.isLoading" type="file" ref="vid" accept="video/*" style="display: none" id="video" v-on:change="uploadVideo()" :class="{ 'upload-complete' : finished_v }" />
          <span class="hinweistext">Bitte nutze ein hochauflösendes Video.</span>
          <span class="error" id="error-v">Bitte lade ein Video hoch.</span>
        </div>
      </div>
    </div>

    <hr />

    <div class="dataupload-container centered">
      <div class="upload-button">
        <div class="upload-button-icon-div centered">
          <img v-if="this.portraitUrl !== ''" :src="this.portraitUrl" alt="portrait" style="height:5em">
          <BIconPersonBoundingBox v-else class="upload-button-icon"/>
        </div>
        <div class="upload-button-text-div centered">
          <label for="portrait" id="portrait-button" :class="{ 'btn-primary-outline upload-complete' : finished_p, 'btn-primary' : !finished_p }">Portraitbild hochladen</label>
          <input type="file" ref="pic" accept="image/*" style="display: none" id="portrait" v-on:change="uploadPic()" :class="{ 'upload-complete' : finished_p }" />
          <span class="hinweistext">Bitte nutze dein rundes, kleines Portraitbild<br/>wie in deiner Email-Signatur. <a href="https://drive.google.com/drive/folders/1kV9kuDzMO5eHp3rJCGpfR9HgVnTALJG-" target="_blank">Link zum Ordner</a></span>
          <span class="error" id="error-p">Bitte lade ein Portraitbild hoch.</span>
        </div>
      </div>
    </div>

    <button class="btn-primary" id="weiter-button" @click="routerPush()">Weiter</button>

  </div>
</template>

<script>
import NavBar from "@/elements/NavBar.vue";
import {BIconArrowLeftCircleFill, BIconCameraVideo, BIconPersonBoundingBox} from "bootstrap-icons-vue";
import router from "@/router";
import BackendService from "@/services/BackendService";
import UserVerification from "@/elements/UserVerification.vue";

export default {
  name: "HomeDashboard",
  components: {
    UserVerification,
    NavBar,
    BIconArrowLeftCircleFill,
    BIconCameraVideo,
    BIconPersonBoundingBox,
  },
  data() {
    return {
      finished_v: localStorage.getItem("finished_v") === "true",
      finished_p: localStorage.getItem("finished_p") === "true",
      isLoading: false,
      portraitUrl: ""
    }
  },
  methods: {
    uploadVideo(){
      this.isLoading = true
      BackendService.uploadFile(this.$refs.vid.files.item(0), this.$cookies.get("token"), this.$cookies.get("email")).then(value => {
        if(value){
          document.getElementById("error-v").style.display = "none";
          this.finished_v = true
          this.isLoading = false
        } else {
          document.getElementById("video-button").style.borderColor = "red";
          this.isLoading = false
        }
      }).catch((error) =>{
        console.error(error);
        document.getElementById("video-button").style.borderColor = "red";
        this.isLoading = false
      })
    },
    async uploadPic(){
      const value = await BackendService.uploadFile(this.$refs.pic.files.item(0), this.$cookies.get("token"), this.$cookies.get("email"));
      if(value){
        document.getElementById("error-p").style.display = "none";
        this.finished_p = true
        this.portraitUrl = localStorage.getItem("portrait_url")
      } else {
        document.getElementById("portrait-button").style.border = "2px solid red"
      }
    },
    routerPush(){
      if(localStorage.getItem("finished_p") === "true" && localStorage.getItem("finished_v") === "true"){
        router.push("/contactData")
      } if(localStorage.getItem("finished_p") !== "true"){
        document.getElementById("error-p").style.display = "inline";
      } if(localStorage.getItem("finished_v") !== "true"){
        document.getElementById("error-v").style.display = "inline";
      }
    },
  },
  watch: {
    finished_v(newValue) {
      localStorage.setItem("finished_v", newValue.toString())
    },
    finished_p(newValue) {
      localStorage.setItem("finished_p", newValue.toString())
    },
  },
  async mounted() {
    if(localStorage.getItem("portrait_url") === null || localStorage.getItem("portrait_url") === "undefined"){
      const email = this.$cookies.get("email")
      const token = this.$cookies.get("token")
      await BackendService.getUserData(email, token)
      if(localStorage.getItem("portrait_url") !== null && localStorage.getItem("portrait_url") !== "undefined"){
        this.finished_p = true;
        this.portraitUrl = localStorage.getItem("portrait_url")
      }
    } else {
      this.portraitUrl = localStorage.getItem("portrait_url")
      this.finished_p = true
    }
  }
}

</script>

<style>

a {
  text-decoration: none;
  color: aquamarine;
}

.error {
  display: none;
  color: red;
}

.upload-button {
  width: 500px;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: transparent;
}

.upload-button-icon-div {
  height: 100px;
  width: 200px;
}

.upload-button-icon {
  vertical-align: middle;
  height: 3em;
  width: 3em;
  color: white;
}

.upload-button-text-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100px;
  width: 100%;
}

.upload-complete {
  border: 1px solid green!important;
}

#first-one {
  margin-top: 50px;
}

</style>