<template>
  <section class="hero is-fullheight is-danger">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title is-1">Adding A Product</p>
        <hr />
        <p class="subtitle">
          Please Enter the follow information below to add a product
        </p>

        <div class="columns is-centered">
          <!-- Show the added product -->
          <div class="column is-5" v-if="show_added_product">
            <div class="box">
              <div class="card">
                <div class="card-header-title has-text-danger">
                  Newly Added Product Details
                </div>
                <div class="card-image" v-if="saved_photo_url">
                  <figure class="image is-4by3">
                    <img :src="saved_photo_url" :alt="saved_photo_url" />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="content">
                    <div class="is-centered">
                      <h1 class="title is-3 has-text-black">
                        <strong class="has-text-black">Product</strong>: {{ added_product_name }}
                      </h1>
                    </div>
                    <div>
                      <h2 class="subtitle is-3 has-text-black">
                        <strong class="has-text-black">Category</strong>: {{ added_category_name }}
                      </h2>
                    </div>
                    <div>
                      <h2 class="subtitle is-3 has-text-black"><strong class="has-text-black">Price</strong>: ${{ added_product_price }}</h2>
                    </div>
                    <hr />
                    <div>
                      <h2 class="subtitle is-4 has-text-black">
                        <strong class="has-text-black">Description</strong>: {{ added_product_description }}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Form to add the product  -->
          <div class="column is-5">
            <form class="box" @submit.prevent="submit_product()">
              <figure class="image is-128x128 is-inline-block">
                <img
                  class="is-square"
                  alt="ppp-logo"
                  src="../assets/ppp_logo.jpg"
                />
              </figure>
              <div class="field">
                <h1 class="title is-4">Category:</h1>
                <div class="select is-medium is-rounded">
                  <select v-model="chosen_category">
                    <option
                      v-for="(category, index) in store_categories"
                      :key="index"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="field">
                <input
                  class="input is-medium"
                  type="text"
                  placeholder="Product Name"
                  v-model="product_name"
                />
              </div>
              <div class="field">
                <input
                    class="input is-medium"
                    type="text"
                    placeholder="Actual Product Link"
                    v-model="actual_product_link"
                />
              </div>
              <div class="field">
                <div class="control">
                  <textarea
                    class="textarea"
                    placeholder="Description"
                    v-model="product_description"
                  ></textarea>
                </div>
              </div>

              <div class="field">
                <div class="control has-icons-left">
                  <span class="icon is-medium is-left">
                    <i class="fas fa-tags"></i>
                  </span>
                  <input
                    class="input is-medium"
                    type="number"
                    min="1"
                    step=".01"
                    placeholder="Product Price"
                    v-model="product_price"
                  />
                </div>
              </div>
              <div id="file-js-example" class="file has-name is-centered">
                <label class="file-label">
                  <input
                    class="file-input"
                    type="file"
                    name="resume"
                    @change="onFileSelected"
                  />
                  <span class="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label"> Choose a file… </span>
                  </span>
                  <span class="file-name"> {{ default_image_name }} </span
                  >&nbsp;
                  <span>
                    <button
                      class="button is-danger is-outlined"
                      @click.prevent="remove_file()"
                    >
                      <span>Remove File </span>
                      <span class="icon is-small">
                        <i class="fas fa-times"></i>
                      </span>
                    </button>
                  </span>
                </label>
              </div>
              <br />
              <button class="button is-success">Submit Product</button>
              <div>
                <p class="help is-danger">
                  {{ error_message }}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import { toast } from "bulma-toast";

export default {
  name: "AdminProduct",
  data() {
    return {
      chosen_category: "",
      product_name: "",
      actual_product_link: "",
      product_description: "",
      product_image: null,
      default_image_name: "No Files Selected",
      product_price: null,
      error_message: "",
      // These data are only configured after the admin posts valid data
      show_added_product: false,
      saved_photo_url: null,
      // showcase the newly added data even with reset form
      added_product_name: "",
      added_category_name: "",
      added_product_price: 0,
      added_product_description: ""
    };
  },
  methods: {
    onFileSelected(event) {
      this.product_image = event.target.files[0];
      this.default_image_name = this.product_image.name;
    },
    submit_product() {
      if (
        this.chosen_category &&
        this.product_name &&
        this.product_price &&
        this.product_description
      ) {
        // Once we are submitting our product lets set loading to true
        this.$store.commit("setIsLoading", true); // waiting for the product to send

        // We need to make sure we get the chosen_category id so
        let category_object = this.store_categories.find(
          (category) => category.name === this.chosen_category
        );

        // When uploading images we are going to use FormData Axios rather than our original way
        const fd = new FormData();
        fd.append("category", category_object.id);
        fd.append("name", this.product_name);
        fd.append("actual_product", this.actual_product_link);
        fd.append("price", parseFloat(this.product_price));
        fd.append("description", this.product_description);
        if (this.product_image) {
          fd.append("image", this.product_image);
        }

        // before we submit we're going to cancel error message so if there was one it'll let them know we are retrying
        this.error_message = null
        axios({
          url: "admin_panel/post_product/",
          method: "POST",
          data: fd,
          headers: { Authorization: `Bearer ${this.accessToken}` },
        })
          .then((response) => {
            console.log(response)
            this.saved_photo_url = response.data.get_image;
            this.$store.commit("setIsLoading", false);
            toast({
              message: `${this.product_name} was added to product list`,
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              duration: 6000, // milliseconds
              position: "bottom-right",
            });
            // We need to set show_added_product to true because we are going to need it to stay if we add a new one
            this.show_added_product = true;
            // Reset form without discarding showcase data
            this.added_category_name = this.chosen_category
            this.chosen_category = null
            this.added_product_name = this.product_name
            this.product_name = null
            this.actual_product_link = null
            this.added_product_price = this.product_price
            this.product_price = null
            this.added_product_description = this.product_description
            this.product_description = null
            this.product_image = null
            this.default_image_name = 'No Files Selected'
            this.saved_photo_url = null
            this.error_message = null
          })
          .catch((err) => {
            if(err.response.data.name){
              this.error_message = err.response.data.name[0];
            } else {
              this.error_message = "Product name is too long"
            }

          });
      } else {
        this.error_message = "Please fill out the form";
      }
    },
    remove_file() {
      this.default_image_name = "No Files Selected";
      this.product_image = null;
    },
  },
  computed: {
    ...mapState(["store_categories", "accessToken", "isLoading"]),
  },
};
</script>
