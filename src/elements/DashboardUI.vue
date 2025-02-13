<template>
  <div class="nocontent" v-if="views.length === 0">
    <p class="isempty-text">Noch keine WeView vorhanden.</p>
  </div>
  <div v-else class="grid-container">
    <div v-for="(item, index) in views" :key="index" class="grid-item">
      <div class="gif-container">
        <a target="_blank" :href="item.link">
          <img :src="item.gifLink" alt="gif" class="gifPreview">
        </a>
        <span class="title">{{ item.title }}</span>
        <span class="created">Von: {{ item.created }}</span>
        <span class="aufrufe">Aufrufe: {{ item.aufrufe }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BackendService from "@/services/BackendService";
import axios from "axios";

export default {
  data() {
    return {
      views: []
    }
  },
  async mounted() {
    const email = this.$cookies.get("email")
    const token = this.$cookies.get("token")

    await BackendService.getUserWeviews(email, token).then(response => {
      const responseJson = JSON.parse(response.toString())
      this.views = responseJson.map(item => ({
        id: item.id,
        link: item.link,
        gifLink: item.gifLink,
        title: item.title,
        created: item.created,
        aufrufe: 0
      }))
    })

    const BACKEND_BASE_URL = process.env.VUE_APP_BACKEND_URL
    const aufrufeRequests = this.views.map(item =>
        axios.get(BACKEND_BASE_URL + "/analytics/" + item.id, {
          headers: {
            'Authorization': token
          }
    }).then(response => {
          item.aufrufe = response.data.data;
        }).catch(error => {
          console.error(`Fehler bei Aufrufen für ID ${item.id}:`, error);
          item.aufrufe = "Fehler";
        })
    );

    await Promise.all(aufrufeRequests)
    console.log("Views", this.views)

  }
}
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-items: center;
  margin-top: 4em;
}

.grid-item {
  display: flex;
  justify-content: start;
  align-items: start;
}

.gifPreview {
  width: 100%;
  max-width: 150px;
  height: auto;
}

.isempty-text {
  color: white;
}

.gif-container {
  color: white;
  display: grid;
}

.title {
  font-family: 'Jost-3', sans-serif;
}

.created {
  font-size: small;
}
</style>