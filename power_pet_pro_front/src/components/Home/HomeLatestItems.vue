<template>
  <div class="section">
    <h1 class="title is-size-2 has-text-centered">Latest Products</h1>
    <!-- This component shows the 10 latest products-->
    <div class="columns is-multiline is-centered">
      <!-- Make sure the latestProducts have .results as this is an Generic ListCreateAPIView-->
      <ProductBox
        v-for="(product, index) in latestProducts"
        :key="index"
        :product="product"
      >
      </ProductBox>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import ProductBox from "../ProductBox";

export default {
  name: "HomeLatestItems",
  components: { ProductBox },
  props: {
    ProductBox,
  },
  computed: {
    ...mapState(["latestProducts"]),
  },
  mounted() {
    // We just need to grab product_list page 1 and that already has 5 products given our Pagination
    this.$store.commit("setIsLoading", true);
    axios.get("product_list/latest_products").then((response) => {
      this.$store.commit("grabLatestProducts", {
        latestProductsProxy: response.data,
      });
      this.$store.commit("setIsLoading", false);
    });
  },
};
</script>

<style scoped></style>
