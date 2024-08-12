<template>
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
          <label for="video" id="video-button" :class="{ 'btn-primary-outline green-border' : finished_v, 'btn-primary' : !finished_v }">Video hochladen</label>
          <input type="file" ref="vid" accept="video/*" style="display: none" id="video" v-on:change="uploadVideo()" :class="{ 'upload-complete' : finished_v }" />
          <span class="hinweistext">Bitte nutze ein hochauflösendes Video.</span>
          <span class="error" id="error-v">Bitte lade ein Video hoch.</span>
        </div>
      </div>
    </div>

    <hr />

    <div class="dataupload-container centered">
      <div class="upload-button">
        <div class="upload-button-icon-div centered">
          <BIconPersonBoundingBox class="upload-button-icon"/>
        </div>
        <div class="upload-button-text-div centered">
          <label for="portrait" id="portrait-button" :class="{ 'btn-primary-outline green-border' : finished_p, 'btn-primary' : !finished_p }">Portraitbild hochladen</label>
          <input type="file" ref="pic" accept="image/*" style="display: none" id="portrait" v-on:change="uploadPic()" :class="{ 'upload-complete' : finished_p}" />
          <span class="hinweistext">Bitte nutze dein rundes, hochauflösendes Portraitbild.</span>
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

export default {
  name: "HomeDashboard",
  components: {
    NavBar,
    BIconArrowLeftCircleFill,
    BIconCameraVideo,
    BIconPersonBoundingBox
  },
  data() {
    return {
      finished_p: false,
      finished_v: false
    }
  },
  methods: {
    uploadVideo(){

      BackendService.uploadFile(this.$refs.vid.files.item(0)).then(value => {
        console.log("Datei gespeichert unter: ", value.toString)
        localStorage.setItem("video_url", value)
      })

      document.getElementById("error-v").style.display = "none";
      this.finished_v = true
    },
    uploadPic(){

      BackendService.uploadFile(this.$refs.pic.files.item(0)).then(value => {
        console.log("Datei gespeichert unter: ", value)
        localStorage.setItem("portrait_url", value)
      })

      document.getElementById("error-p").style.display = "none";
      this.finished_p = true
    },
    routerPush(){
      if(localStorage.getItem("finished_p") === "true" && localStorage.getItem("finished_v") === "true"){
        router.push("/contactData")
      } if(!this.finished_p){
        document.getElementById("error-p").style.display = "inline";
      } if(!this.finished_v){
        document.getElementById("error-v").style.display = "inline";
      }
    },
  },
  watch: {
    finished_p(newValue){
      localStorage.setItem("finished_p", newValue)
    },
    finished_v(newValue){
      localStorage.setItem("finished_v", newValue)
    }
  },
  mounted(){
    if(localStorage.getItem("finished_v") !== "null"){
      this.finished_v = localStorage.getItem("finished_v")
    } if(localStorage.getItem("finished_p") !== "null"){
      this.finished_p = localStorage.getItem("finished_p")
    }
  }
}

</script>

<style>

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
  border: 1px solid green;
}

#first-one {
  margin-top: 50px;
}

</style>