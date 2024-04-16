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
          <label for="video" class="btn-primary" id="video-button">Video hochladen</label>
          <FileUpload accept="video/*" :target="videoUploadUrl" action="POST" style="display: none" id="video" v-on:finish="finishUpload('video')" />
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
          <label for="portrait" class="btn-primary" id="portrait-button">Portraitbild hochladen</label>
          <FileUpload accept="image/*" :target="portraitUploadUrl" action="POST" style="display: none" id="portrait" v-on:finish="finishUpload('portrait')" />
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
import FileUpload from 'vue-simple-upload/dist/FileUpload.vue'
import {BIconArrowLeftCircleFill, BIconCameraVideo, BIconPersonBoundingBox} from "bootstrap-icons-vue";
import router from "@/router";

export default {
  name: "HomeDashboard",
  data() {
    return {
      videoUploadUrl: process.env.VUE_APP_BACKEND_URL + "/video-upload",
      portraitUploadUrl: process.env.VUE_APP_BACKEND_URL + "/portrait-upload",
      finished_p: false,
      finished_v: false
    }
  },
  components: {
    NavBar,
    FileUpload,
    BIconArrowLeftCircleFill,
    BIconCameraVideo,
    BIconPersonBoundingBox
  },
  methods: {
    // https://github.com/saivarunk/vue-simple-upload?tab=readme-ov-file#usage-1
    finishUpload(id) {
      const completedUpload = document.getElementById(id);

      if (completedUpload && id === "video") {
        completedUpload.classList.add('upload-complete')
        document.getElementById("error-v").style.display = "none";
        document.getElementById("video-button").classList.remove("btn-primary")
        document.getElementById("video-button").classList.add("btn-primary-outline")
        document.getElementById("video-button").classList.add("green-border")

        let videoFile = document.getElementById("video").files[0].name;
        localStorage.setItem("video", videoFile);
      }
      if(completedUpload && id === "portrait"){
        completedUpload.classList.add('upload-complete')
        document.getElementById("error-p").style.display = "none";
        document.getElementById("portrait-button").classList.remove("btn-primary")
        document.getElementById("portrait-button").classList.add("btn-primary-outline")
        document.getElementById("portrait-button").classList.add("green-border")

        let portraitFile = document.getElementById("portrait").files[0].name;
        localStorage.setItem("portrait", portraitFile);
      }

      if(id === "video"){ this.finished_v = true }
      if(id === "portrait"){ this.finished_p = true }

    },
    routerPush(){
      if(this.finished_p && this.finished_v){
        router.push("/contactData")
      } else if(this.finished_p){
        document.getElementById("error-v").style.display = "inline";
      } else if(this.finished_v){
        document.getElementById("error-p").style.display = "inline";
      } else if(!this.finished_v && !this.finished_p){
        document.getElementById("error-v").style.display = "inline";
        document.getElementById("error-p").style.display = "inline";
      }
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