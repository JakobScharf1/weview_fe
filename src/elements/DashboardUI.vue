<template>
  <div class="nocontent" v-if="views.length === 0">
    <p>Noch keine WeView vorhanden.</p>
  </div>
  <div v-else class="grid-container">
    <div v-for="(item, index) in views" :key="index" class="grid-item">
      <a target="_blank" :href="item.link">
        <img :src="item.gifLink" alt="gif" class="gifPreview">
      </a>
    </div>
  </div>
</template>

<script>
import BackendService from "@/services/BackendService";

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
        link: item.link,
        gifLink: item.gifLink
      }))
    })
    console.log(this.views)
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
  justify-content: center;
  align-items: center;
}

.gifPreview {
  width: 100%;
  max-width: 150px;
  height: auto;
}
</style>