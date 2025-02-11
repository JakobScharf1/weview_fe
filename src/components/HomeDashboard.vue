<template>
  <UserVerification />
  <NavBarDashboard />
  <div class="content">
    <div class="full-width-div">
      <h1>Deine WeViews</h1>
    </div>
    <DashboardUI />
    <div class="full-width-div margin-topper">
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
import UserVerification from "@/elements/UserVerification.vue";
import DashboardUI from "@/elements/DashboardUI.vue";

export default {
  name: "HomeDashboard",
  components: {
    UserVerification,
    NavBarDashboard,
    BIconPlus,
    DashboardUI
  },
}
</script>

<style>

.margin-topper {
  margin-top: 50px;
}

#plus-icon-dashboard {
  height: 1.8em;
  width: 1.8em;
  vertical-align: middle;
}

#create-button-text-dashboard {
  vertical-align: middle;
}

</style>