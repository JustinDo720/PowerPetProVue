<template>
  <div>
    <div class="column">
<!--      <div class="card">-->
<!--        <div class="card-image">-->
<!--          <a href="#" @click="viewDetails(product.get_absolute_url)">-->
<!--            <figure class="image mb-4">-->
<!--              <img :src="product.thumbnail_loc" alt="product-thumbnail" />-->
<!--            </figure>-->
<!--          </a>-->
<!--        </div>-->
<!--        <div class="card-content">-->
<!--          <a href="#" @click="viewDetails(product.get_absolute_url)">-->
<!--            <h3 class="title is-size-4" @click="viewDetails(product.get_absolute_url)">-->
<!--              {{ product.product_name }}-->
<!--            </h3>-->
<!--          </a>-->
<!--          <div class="content">-->
<!--            <p class="subtitle is-3">${{ product.price }}</p>-->
<!--            <div class="columns is-multiline">-->
<!--              <footer class="card-footer column has-text-centered">-->
<!--                <button class="button is-primary" @click="addToCart(product)">-->
<!--              <span class="icon is-small">-->
<!--                <i class="fas fa-plus"></i>-->
<!--              </span>-->
<!--                  <span> Add To Cart </span>-->
<!--                </button>-->
<!--              </footer>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

      <div class="box">
        <a href="#" @click="viewDetails(product.get_absolute_url)">
          <figure class="image mb-4">
            <img :src="product.get_thumbnail" alt="product-thumbnail" />
          </figure>
        </a>
        <a href="#" @click="viewDetails(product.get_absolute_url)">
          <h3 class="title is-size-4" @click="viewDetails(product.get_absolute_url)">
            {{ product.product_name }}
          </h3>
        </a>
        <p class="subtitle is-3">${{ product.price }}</p>
        <div class="columns is-multiline">
          <footer class="card-footer column has-text-centered">
            <button class="button is-primary" @click="addToCart(product)">
              <span class="icon is-small">
                <i class="fas fa-plus"></i>
              </span>
              <span> Add To Cart </span>
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBox",
  props: {
    product: Object, // We are going to ask for a product which is binded in the parent component
  },
  methods: {
    viewDetails(product_abs_url) {
      let product_url = "/product_list/product_detail" + product_abs_url;
      // what we want to do is push to our product url. the product_abs_url is like: /category_slug/product_slug/
      this.$router.push(product_url);
    },
    addToCart(storeItem) {
      // Remember Item has to be an obj or product and quantity because addToCart mutation checks for current items
      let item = {
        product: storeItem,
        quantity: 1, // 1 is our default because in our Home page we only offer one item
      };
      this.$store.commit("addToCart", {
        item_object: item,
      });
    },
  },
};
</script>

<style scoped>
.image {
  margin-top: -1.25rem;
  margin-left: -1.25rem;
  margin-right: -1.25rem;
}
</style>
