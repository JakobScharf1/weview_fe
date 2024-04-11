<template>
  <NavBarDashboard />
  <div class="content">
    <div class="full-width-div">
      <h1>Deine WeViews</h1>
    </div>
    <div class="full-width-div">
      <button class="btn-primary" @click="$router.push('/chooseViewType')">
        <BIconPlus id="plus-icon-dashboard" />
        <span id="create-button-text-dashboard">Neue WeView erstellen</span>
      </button>
    </div>
  </div>
</template>

<script>
import NavBarDashboard from "@/elements/NavBarDashboard.vue";
import {BIconPlus} from "bootstrap-icons-vue";

export default {
  name: "HomeDashboard",
  components: {
    NavBarDashboard,
    BIconPlus
  },
}
</script>

<style>

#plus-icon-dashboard {
  height: 1.8em;
  width: 1.8em;
  vertical-align: middle;
}

#create-button-text-dashboard {
  vertical-align: middle;
}

</style>