<template>
  <div class="has-text-centered">
    <h1 class="title is-1">Check Your Order</h1>
    <h3 class="subtitle is-3">
      Use your Order Number and Email Address to check your order details
    </h3>
  </div>
  <section class="section is-small">
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="container">
          <div
            class="box content has-text-centered has-background-success-light"
          >
            <h3 class="title is-3">Enter your Email and Order Number:</h3>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  class="input is-focused is-medium"
                  type="email"
                  placeholder="Email Address"
                  v-model="email"
                />
                <span class="icon is-medium is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  class="input is-medium is-focused"
                  type="text"
                  placeholder="Order Number"
                  v-model="OrderNum"
                  @keydown.enter="check_order_number()"
                />
                <span class="icon is-medium is-left">
                  <i class="fas fa-hashtag"></i>
                </span>
              </div>
            </div>
            <button class="button is-primary" @click="check_order_number()">
              Check Order #{{ OrderNum }}
            </button>
            <div class="content">
              <p class="help">
                * You can find your order number from the email we sent you.
              </p>
              <p class="help is-danger" v-if="this.error_msg">
                {{ error_msg }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "CheckOrder",
  data() {
    return {
      OrderNum: "",
      error_msg: "",
      email: "",
    };
  },
  methods: {
    check_order_number() {
      let order_number = parseInt(this.OrderNum);
      if (order_number) {
        this.error_msg = ""; // Let's reset our error message
        // We need to check if the order number exists if not let's give an another error message
        let data = {
          email: this.email,
        };

        if (this.user_id) {
          data["user_id"] = this.user_id;
        }
        axios.post(`check_order/${order_number}/`, data).then((response) => {
          if (response.data.order_exists) {
            // if we our exist then we will proceed to send this user over to individual order
            if (this.user_id) {
              this.$router.push({
                name: "IndividualOrder",
                params: { id: this.user_id, order_number: order_number },
              });
            } else {
              // Anonymous user
              this.$router.push({
                name: "IndividualOrder",
                params: { id: null, order_number: order_number },
              });
            }
          } else {
            this.error_msg =
              "* Please check if this order number appears on the email that we've sent to you.";
          }
        });
      } else {
        this.error_msg = "* Please enter in your Order Number.";
      }
    },
  },
  computed: {
    ...mapState(["user_id"]),
  },
};
</script>
