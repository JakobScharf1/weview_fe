<template>
  <NavBar />
  <div class="content">
    <div class="full-width-div">
      <h1>Dein WeView wurde erfolgreich erstellt!</h1>
    </div>

    <div class="full-width-div link">
      <p>Link zum WeView: <span>{{ viewLink }}</span></p><BIconCopy @click="copyLink()" class="clickable" />
    </div>
    <div class="full-width-div link">
      <p>Link zum Video-GIF: <span>{{ gifLink }}</span></p>
    </div>
  </div>
</template>

<script>
import NavBar from "@/elements/NavBar.vue";
import {BIconCopy} from "bootstrap-icons-vue";

export default {
  name: "GeneratingSuccess",
  data() {
    return {
      viewLink: "",
      gifLink: ""
    }
  },
  components: {
    NavBar,
    BIconCopy
  },
  methods: {
    copyLink(){
      navigator.clipboard.writeText(this.viewLink)
      alert()
    }
  },
  created() {
    if(localStorage.getItem('viewLink')) {
      this.viewLink = localStorage.getItem("viewLink")
    }
    if(localStorage.getItem('gifLink')) {
      this.gifLink = localStorage.getItem("gifLink")
    }
  }
}

</script>

<style>
.link {
  color: white;
  font-size: x-large;
}

.clickable:hover {
  cursor: pointer;
}
</style>