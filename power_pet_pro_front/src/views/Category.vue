<template>
  <h1 class="title is-size-2 has-text-centered">{{ categoryName }}</h1>
  <br>
  <div id="category_product" class="columns is-multiline is-centered">
    <ProductBox
      v-for="(product, index) in categoryProducts"
      :key="index"
      :product="product"
    >
    </ProductBox>
  </div>
</template>
<script>
import axios from "axios";
import ProductBox from "../components/ProductBox";
export default {
  name: "Category",
  components: {
    ProductBox,
  },
  data() {
    return {
      categoryProducts: {},
      categoryName: "",
    };
  },
  methods: {
    grabCategoryDetails() {
      // Make sure you are using $route not $router for params catching. .category_slug is the : in router
      let category_slug = this.$route.params.category_slug;
      this.categoryName = this.$route.params.category_name;
      console.log(this.$route.params)
      axios
        .get(`/category_list/category_detail/${category_slug}/`)
        .then((response) => {
          this.categoryProducts = response.data;
          this.$store.commit("setIsLoading", false);
        });

    },
  },
  created() {
    this.$store.commit("setIsLoading", true);
    this.grabCategoryDetails();

  },
};
</script>
