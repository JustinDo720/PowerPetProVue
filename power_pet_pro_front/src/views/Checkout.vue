<template>
  <section class="hero is-medium is-primary">
    <div class="hero-body">
      <div class="columns is-centered">
        <!-- Information Column -->
        <div class="column container is-10">
          <div class="box">
            <div class="title is-2 has-text-black">Shipping Details</div>
            <p class="help has-text-grey">* All fields are required</p>
            <div class="field control">
              <div class="columns">
                <div class="column control">
                  <label> First Name* </label>
                  <input
                    class="input"
                    type="text"
                    placeholder="First Name"
                    v-model="first_name"
                  />
                </div>
                <div class="column control">
                  <label> Last Name* </label>
                  <input
                    class="input"
                    type="text"
                    placeholder="Last Name"
                    v-model="last_name"
                  />
                </div>
              </div>
              <div class="columns">
                <div class="column control">
                  <label>Email* </label>
                  <div
                    class="notification is-warning is-light"
                    v-if="active_email"
                  >
                    <p>This email is linked to an active account.</p>
                    <p>
                      Would you like to reset your password?
                      <router-link
                        :to="{
                          name: 'ResetPassword',
                          params: { registered_email: email },
                        }"
                      >
                        <button class="button is-small is-danger is-outlined">
                          Reset Password Here
                        </button>
                      </router-link>
                    </p>
                    <p>
                      <button
                        class="button is-outlined is-success is-small"
                        @click="continue_purchase()"
                      >
                        Let Me Continue With My Purchase
                      </button>
                    </p>
                  </div>
                  <input
                    class="input"
                    type="email"
                    placeholder="Email"
                    v-model="email"
                  />
                  <p class="help has-background-warning has-text-dark">
                    * <b><u>PLEASE</u></b> be sure to use an <b>ACTIVE EMAIL. We will be sending your order confirmation. </b>*
                  </p>
                </div>
                <div class="column control">
                  <label> Phone Number* </label>
                  <input
                    class="input"
                    type="text"
                    placeholder="Phone Number"
                    v-model="phone_number"
                  />
                </div>
              </div>
              <div class="columns">
                <div class="column control is-5">
                  <label> Address* </label>
                  <input
                    class="input"
                    type="text"
                    placeholder="Address"
                    v-model="address"
                  />
                </div>
                <div class="column control is-3">
                  <label> City* </label>
                  <input
                    class="input"
                    type="text"
                    placeholder="City"
                    v-model="city"
                  />
                </div>
                <div class="column control">
                  <label> Zip Code* </label>
                  <input
                    class="input"
                    type="text"
                    placeholder="Zip Code"
                    v-model="zip_code"
                  />
                </div>
              </div>
              <div class="columns">
                <div class="column is-5 control">
                  Country*
                  <div class="select">
                    <select v-model="chosen_country">
                      <option
                        v-for="(country, index) in countries"
                        :key="index"
                      >
                        {{ country }}
                      </option>
                    </select>
                  </div>
                  <p class="help is-info column">
                    * Be sure to select a <u>country</u> <b>FIRST</b> then select a <u>state</u>  *
                  </p>
                </div>
                <div class="column is-5 control">
                  State*
                  <div class="select">
                    <select v-model="chosen_state">
                      <option
                        v-for="(state, index) in country_states"
                        :key="index"
                      >
                        {{ state }}
                      </option>
                    </select>
                  </div>
                  <p class="help is-info column">
                    * You may <b>click</b> on the <u>Country or State</u> box and <b>start typing</b> for faster selection *
                  </p>
                </div>

              </div>
              <div class="columns">
                <div class="column control">
                  <div ref="card" class="mb-5 form-control"></div>
                  <p class="help is-info ">
                    * You may copy and paste (with hyphens) the information on your card (located on to top right above your items  :) *
                  </p>
                </div>
              </div>
              <div class="column" v-if="errors">
                <p
                    class="help is-danger"
                    v-for="(error, index) in errors"
                    :key="index"
                >
                  {{ error }}
                </p>
              </div>

              <button class="button is-dark" @click="submit_shipping_details">
                Pay With Stripe
              </button>
            </div>
          </div>
        </div>
        <div class="is-divider-vertical"></div>
        <!-- User Card and Item Information -->
        <div class="columns is-multiline">
          <!-- Card Info -->
          <div class="column container is-full">
            <div class="card mt-3"
                 :class="{
                    'visa': user_card_info['card_id'] === 1,
                    'mastercard': user_card_info['card_id'] === 2,
                    'americanExpress': user_card_info['card_id'] === 3,
                    'discover': user_card_info['card_id'] === 4,
                    'dinersClub': user_card_info['card_id'] === 5,
                    'jcb': user_card_info['card_id'] === 6,
                    'unionPay': user_card_info['card_id'] === 7,
                  }"
            >
              <div class="card-content">
                <div class="content">
                  <h1 class="title is-2">
                    {{ user_card_info.card_name }}
                  </h1>
                  <h2 class="subtitle is-4 has-text-black">
                    {{ user_card_info.show_card_number }}
                  </h2>
                  <div class="columns">
                    <div class="column">
                      <h3 class="subtitle is-5 has-text-black" v-if="first_name && last_name">
                        {{ first_name }}  {{ last_name }}
                      </h3>
                      <h3 class="subtitle is-5 has-text-black" v-else>
                        Guest User
                      </h3>
                    </div>
                    <div class="column">
                      <h3 class="subtitle is-5 has-text-black">
                        Expiration Date: {{ user_card_info.card_exp_date }}
                      </h3>
                    </div>
                    <div class="column">
                      <h3 class="subtitle is-5 is-black has-text-black">
                        CVV: {{ user_card_info.card_cvv }}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- item Info -->
          <div class="column container is-full">
            <div class="box scrollable">
              <div class="title is-2 has-text-black">Your Items</div>
              <div class="box has-background-primary">
                <p class="title is-4 has-text-black">
                  <strong>
                    Total: ${{ cartTotalPrice.toFixed(2) }}
                  </strong>
                </p>
              </div>
              <article
                  class="media has-background-light"
                  v-for="(cart_item, index) in cart.items"
                  :key="index"
              >
                <figure class="media-left">
                  <p class="image is-64x64">
                    <img :src="cart_item.photo" alt="Product-Image" />
                  </p>
                </figure>
                <div class="media-content">
                  <p class="title is-4 has-text-black">
                    {{ cart_item.name }}
                  </p>
                  <p class="subtitle is-6 has-text-black">
                    <strong class="has-text-black">Quantity: </strong
                    >{{ cart_item.quantity }}
                    <br />
                    <strong class="has-text-black">Total Price: $</strong
                    >{{ cart_item.price * cart_item.quantity }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Cookies from "cookies-js";
import countries_and_states from "../assets/Profile/countries_and_states";
import axios from "axios";
import { toast } from "bulma-toast";

export default {
  name: "Checkout",
  data() {
    return {
      stripe: {},
      card: {},
      states: [],
      countries: [],
      chosen_state: "",
      chosen_country: "",
      first_name: "",
      last_name: "",
      email: "",
      active_email: false,
      phone_number: "",
      address: "",
      city: "",
      zip_code: "",
      user_card_info: {},
      errors: {},
      continue_order: false,
    };
  },
  computed: {
    ...mapState(["cart", "accessToken", "available_cards"]),
    ...mapGetters(["isAuth"]),
    country_states() {
      let country_selected = {};
      if (this.chosen_country) {
        let state_obj = this.states.filter(
          (country) => country.country === this.chosen_country
        );
        if (state_obj[0]) {
          country_selected = state_obj[0].states; // the thing is we are getting an array back so we need to grab the first result
        }
      } else {
        country_selected = { states: "Please choose a country first!!" }; // We need this to make sure that country_states return something not null
      }
      return country_selected;
    },
    cartTotalPrice() {
      let totalPrice = 0;
      for (
          let item_index = 0;
          item_index < this.cart.items.length;
          item_index++
      ) {
        // We need to make sure we take quantity into account
        if (this.cart.items[item_index].quantity >= 2) {
          totalPrice +=
              this.cart.items[item_index].quantity *
              this.cart.items[item_index].price;
        } else {
          // Since we are doing calculations we need the number form. Price is in string format
          totalPrice += Number(this.cart.items[item_index].price);
        }
      }
      // Once we finish to need to make sure we update our localstorage
      localStorage.setItem("cart", JSON.stringify(this.$store.state.cart));
      return totalPrice;
    }
  },
  methods: {
    async submit_shipping_details() {
      // Handle individual missing fields
      let fields = [
        { "first name": this.first_name },
        { "last name": this.last_name },
        { address: this.address },
        { email: this.email },
        { "phone number": this.phone_number },
        { city: this.city },
        { "zip code": this.zip_code },
        { country: this.chosen_country },
        { state: this.chosen_state },
      ];

      // Need to make sure we remove stripe error before every run then apply it if there is another err
      if(this.errors['stripe']){
        delete this.errors['stripe']
      }

      for (let field in fields) {
        let field_name = Object.keys(fields[field])[0];
        let field_value = fields[field][field_name];
        if (field_value === "" || field_value === null) {
          this.errors[field_name] = `* The ${field_name} field is missing!`;
        } else if (
          field_name === "email" &&
          field_value !== "" &&
          !this.isAuth &&
          !this.continue_order
        ){
          // this email field has been filled in and this user is anonymous so let's check if the email has been used
          await axios.post("check_email/", { email: this.email}).then((r)=>{
            if(r.data.exists){
              this.active_email = true;
            }
          })
        } else {
          delete this.errors[field_name];
        }
      }

      // We don't have errors and active email notification isn't opened
      if (!Object.keys(this.errors).length && !this.active_email) {
        this.$store.commit("setIsLoading", true);
        this.stripe.createToken(this.card).then((result) => {
          if (result.error) {
            this.$store.commit("setIsLoading", false);
            this.errors["stripe"] =
              "* Something went wrong with the Payment. Please try again";
          } else {
            this.stripeTokenHandler(result.token);
          }
        });
      }
    },
    async stripeTokenHandler(token) {
      const items = [];
      // We just need to loop over the item in our cart and push it in our const items variable
      for (let i = 0; i < this.cart.items.length; i++) {
        const curr_item = this.cart.items[i];
        const obj = {
          product: curr_item.product, // we are getting the id of the product for our db to read it
          quantity: curr_item.quantity,
          price: curr_item.price, // we should not be posting the price as the total price just do the math frontend
        };
        items.push(obj);
      }
      const data = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        address: this.address,
        zipcode: this.zip_code, // for order api
        zip_code: this.zip_code, // for profile api
        phone: this.phone_number, // for order api
        phone_number: this.phone_number,  // for profile api
        city: this.city,
        country: this.chosen_country,
        state: this.chosen_state,
        items: items,
        stripe_token: token.id,
      };

      // We are using this to make our backend know that the requested user is actually authenticated and not anonymous
      if (Cookies("user_id") && this.accessToken) {
        console.log('we are saving the user data')
        data["user"] = Cookies("user_id");
        Cookies.set("order_email", this.email);
        let config = {
          headers: { Authorization: `Bearer ${this.accessToken}` },
        };
        // let's make sure we wait for this post request but we could only post if there's a user_id
        /*
        OKAY, We CANNOT use the same data variable for both the checkout and update profile api because of different
        key names like phone for order but phone_number for profile. So to solve this we could just simply add:

        phone_number: this.phone_number
        zip_code: this.zip_code

        In addition to the zipcode and phone keys in our data var
         */
        await axios.put(
          `profile_list/user_profile/${Cookies("user_id")}/`,
          data,
          config
        ).then(r=>{
          console.log(r.data)
        });
      } else {
        // our user is anonymous so let's set our their email in our cookies for us to email them their order
        Cookies.set("anonymous_user_email", this.email);
      }

      axios
        .post("checkout/", data)
        .then((response) => {
          this.$store.commit("clearCart");
          this.$router.push({
            name: "Success",
            params: { order_id: response.data.id },
          });
        })
        .catch((err) => {
          this.errors["checkout"] = err.message;
        });

      // We need to set loading off because we initially set it true in submit_shipping_details
      this.$store.commit("setIsLoading", false);
    },
    continue_purchase() {
      this.active_email = !this.active_email;
      this.continue_order = !this.continue_order;
      this.submit_shipping_details();
    },
  },
  created() {
    // We are going to set our model countries to the our country objects
    this.states = countries_and_states.countries;
    this.states.forEach((country) => {
      this.countries.push(country.country);
    });
    // Now let's take care of our signed in users. Their information will now appear in shipping details
    if (Cookies("accessToken") && Cookies("user_id")) {
      axios
        .get(`profile_list/user_profile/${Cookies("user_id")}/`, {
          headers: { Authorization: `Bearer ${Cookies("accessToken")}` },
        })
        .then((response) => {
          this.first_name = response.data.first_name;
          this.last_name = response.data.last_name;
          this.address = response.data.address;
          this.zip_code = response.data.zip_code;
          this.city = response.data.city;
          this.chosen_country = response.data.country;
          this.chosen_state = response.data.state;
          this.email = response.data.email;
          this.phone_number = response.data.phone_number;
          // lets filter the exact card
          this.user_card_info = this.available_cards.filter(card=>card.card_id === response.data.card)[0] // filter list
        });
    } else {
      // if the user is a guest then we could put the default visa card for this.user_card_info
      this.user_card_info = this.available_cards[0]
    }
  },
  mounted() {
    document.title = "Checkout | Power Pet Pro";
    // we create an instance of stripe and we use window because of index.html with our stripe cdn
    this.stripe = window.Stripe(process.env.VUE_APP_STRIPE_TEST_TOKEN);
    // We need to create an instance of elements
    const elements = this.stripe.elements();
    // Just styling for stripe which we will add when we create an element of card
    const style = {
      base: {
        color: "#32325d",
        lineHeight: "24px",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };
    // Creating an element of card with some options like style and hidePostalCode
    this.card = elements.create("card", { hidePostalCode: true, style: style });
    // Once we finish creating an instance of stripe of elements and binding them to this.card we mount it
    this.card.mount(this.$refs.card); // this.$refs.card just mounts it to the div that has ref='card'
  },
};
</script>

<style scoped>
/* Although we dont use the class StripeElement stripe actually puts class='StripeElement' wherever card is mounted */
.StripeElement {
  background-color: white;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

.visa{
  background-color: #1372ec !important;
}

.mastercard{
  background-color: #c9ccd5 !important;
}

.americanExpress{
  background-color: #03a786 !important;
}

.discover{
  background-color: #c73202 !important;
}

.dinersClub{
  background-color: #af00ac !important;
}

.jcb{
  background-color: #5f82da !important;
}

.unionPay{
  background-color: #bcbdbc !important;
}

.scrollable{
  /* Apply max-height to use overflow-y for scroll bar*/
  max-height: 540px;
  overflow-y: scroll;
}
</style>
