<template>
  <div id="nav">
    <MessageBar class="mb-3 p-4"></MessageBar>
    <NavBar></NavBar>
    <!-- route.fullPath will trigger a reload once our router changes -->
    <router-view :key="$route.fullPath" />
    <div
      class="is-loading-bar has-text-centered"
      :class="{ 'is-loading': this.isLoading }"
    >
      <div class="lds-dual-ring"></div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import MessageBar from "./components/MessageBar";
import Footer from "./components/Footer";
import { mapState } from "vuex";
import bulmaQuickview from "bulma-quickview/src/js";

export default {
  components: {
    NavBar,
    MessageBar,
    Footer,
  },
  computed: {
    ...mapState(["isLoading"]),
  },
  mounted() {
    document.title = "Power Pet Pro";
    var quickviews = bulmaQuickview.attach(); // quickviews now contains an array of all Quickview instances
    // upon the app rendering, you want to make sure the available cards are in our store
    this.$store.commit('update_available_cards')
  },
};
</script>

<style lang="scss">
@import "../node_modules/bulma";
@import "~bulma";
@import "~bulma-quickview";
@import "~bulma-switch";
@import "~bulma-divider";
@import "~bulma-carousel";

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  &.is-loading {
    height: 80px;
  }
}
</style>
