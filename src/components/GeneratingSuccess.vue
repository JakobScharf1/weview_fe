<template>
  <UserVerification />
  <NavBar />
  <div class="content">
    <div class="full-width-div">
      <h1>Dein WeView wurde erfolgreich erstellt!</h1>
    </div>

    <div class="full-width-div link" id="gif-link-container">
      <p style="margin:0">GIF-Vorschau zum Teilen:</p><BIconCopy @click="copyGif()" class="clickable" id="copy-gif"></BIconCopy>
    </div>
    <div class="hinweis-container">
      <p id="gif-hinweis">Das GIF ist nur per Email, LinkedIn o.ä. teilbar. Es kann sein, dass es bei vielen Websites nicht richtig funktioniert.</p>
    </div>
    <div class="full-width-div link second">
      <p>Link zum WeView: <span>{{ viewLink }}</span></p><BIconCopy @click="copyLink()" class="clickable" id="copy-link" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/elements/NavBar.vue";
import {BIconCopy} from "bootstrap-icons-vue";
import UserVerification from "@/elements/UserVerification.vue";

export default {
  name: "GeneratingSuccess",
  data() {
    return {
      viewLink: "",
      gifLink: ""
    }
  },
  components: {
    UserVerification,
    NavBar,
    BIconCopy
  },
  methods: {
    copyLink(){
      navigator.clipboard.writeText(this.viewLink)
      //Makes Copy-Icon green for one second
      const copyLink = document.getElementById("copy-link")
      copyLink.style.filter = "invert(23%) sepia(90%) saturate(5184%) hue-rotate(114deg) brightness(94%) contrast(110%)"
      setTimeout(() =>{
        copyLink.style.filter = ""
      }, 500)
    },
    async copyGif() {
      const htmlContent = "<a href='" + this.viewLink + "'><img src='" + this.gifLink + "' alt='GIF' height='150px' target='_blank'></a>"
      const blob = new Blob([htmlContent], { type: "text/html"})
      const clipboardItem = new ClipboardItem({"text/html": blob})
      try {
        await navigator.clipboard.write([clipboardItem])
      } catch (error) {
        console.error("Fehler beim Kopieren des GIFs: ", error)
      }
      const copyLink = document.getElementById("copy-gif")
      copyLink.style.filter = "invert(23%) sepia(90%) saturate(5184%) hue-rotate(114deg) brightness(94%) contrast(110%)"
      setTimeout(() =>{
        copyLink.style.filter = ""
      }, 500)
    }
  },
  created() {
    if(localStorage.getItem('viewLink')) {
      this.viewLink = localStorage.getItem("viewLink")
    }
    if(localStorage.getItem('gifLink')) {
      this.gifLink = localStorage.getItem("gifLink")
    }
  },
  beforeRouteLeave() {
    const token = localStorage.getItem("token")
    localStorage.clear()
    localStorage.setItem("token", token)
  }
}

</script>

<style>
.link {
  color: white;
  font-size: x-large;
  margin-top: 5em;
}

.clickable:hover {
  cursor: pointer;
}

#copy-link, #copy-gif {
  margin-left: 10px;
}

#gif-hinweis {
  font-size: small;
}

.hinweis-container {
  color: white;
}

.second {
  font-size: large;
}
</style>