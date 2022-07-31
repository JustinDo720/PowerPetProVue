<template>
  <div id="searchContainer">
    <div class="columns is-multiline has-text-centered">
      <div class="column is-12">
        <h1 class="title is-2">Search</h1>
        <h2 class="is-size-5 has-text-grey">Search term: "{{ searchTerm }}"</h2>
      </div>
      <ProductBox
        v-for="(product, index) in searched_products"
        :key="index"
        :product="product"
      >
      </ProductBox>
    </div>
  </div>
</template>

<script>
import ProductBox from "../components/ProductBox";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Search",
  components: {
    ProductBox,
  },
  computed: {
    ...mapState(["searchTerm", "searched_products"]),
  },
};
</script>
