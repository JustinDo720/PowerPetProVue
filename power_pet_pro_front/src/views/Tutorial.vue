<template>

  <section class="section is-medium has-background-success">
    <h1 class="title">Fast Tutorial</h1>
    <h2 class="subtitle">
      Simple purchasing and receiving your order confirmation
    </h2>
    <div class="columns">
      <!-- Items -->
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1>Picking your items</h1>
              <p>
                <b>Find items</b> that you need and <b>add them to cart</b>. You could do this in <u>two ways</u>:
                <ol>
                  <li>
                    <b>Search the item name using the search bar</b>
                  </li>
                  <li>
                    <b>Clicking shop then selecting a category that your item might be located in</b>
                  </li>
                </ol>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Checkout -->
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1>Checking Out</h1>
              <p>
                Once you finish adding your items to your cart, you could <b>click on the shopping bag</b> on the top right
                then <b>proceed to checkout</b>. There you will:
                <ol>
                  <li>
                    Provide your shipping details
                  </li>
                  <li>
                    Enter the <b><u>GIVEN</u></b> card information
                    <ul>
                      <li class="has-text-info">
                        NOTE: The <b>DEFAULT</b> Visa card is provided for guest users to try.
                      </li>
                    </ul>
                  </li>
                </ol>
              </p>
              <p class="has-text-primary">
                Please provide an <b><u>ACTIVE EMAIL</u></b> (meaning an email that you have access to) for us to send
                your order number and information.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Order confirmation  -->
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1>Checking for Order Confirmation</h1>
              <p>
                After we confirmed your purchase,
                <ol>
                  <li>
                    Please check your email
                    <ul>
                      <li>
                        an <b>email will be sent with your order number</b> for you to retrieve your
                        <b>order summary</b>
                        <ul>
                          <li>
                            which includes your shipping address, items, total price and more.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    Look and click on your order number
                    <ul>
                      <li>
                        You could check your order number <router-link :to="{name: 'CheckOrder'}">here</router-link> or
                        click on <b>Account</b> > <b>Check Order</b> and put in your information :)
                      </li>
                    </ul>
                  </li>
                  <li class="has-text-success">
                    <b><u>OPTIONAL</u></b>: Submit a feedback using the link provided in the email.  I would really
                    appreciate it so I keep these things in mind for other projects.
                  </li>
                </ol>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section is-medium has-background-info">
    <h1 class="title">Full Tutorial</h1>
    <h2 class="subtitle">
      Take advantage of the full experience with an account
    </h2>
    <div class="columns">
      <!-- Signing up -->
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1>Register and Confirm</h1>
              <p>
                Create an account <router-link :to="{name:'Register'}">here</router-link> or go to <b>Account</b> >
                <b>Create Account</b> to register
                <ol>
                  <li>
                    Please use an <b><u>ACTIVE EMAIL</u></b> because we will be sending a confirmation link to fully add
                    you into our system for extra security.
                  </li>
                  <li>
                    Once you received the email, <b>click on the link</b> to activate your account then <b>log in</b>.
                  </li>
                </ol>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Setting up Profile -->
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1>Setting up your Profile</h1>
              <p>
                <b>Click on your username in to top right</b> to enter your profile page. Here:
                <ol>
                  <li>
                    You could edit your information by <b>turning on edit mode</b>.
                  </li>
                  <li>
                    <b>Change information</b> such as which card you'd look to use
                    (only available for registered users &#128065;&#128069;&#128065;)
                  </li>
                </ol>
              </p>
              <p>
                You could also <b>view your orders</b> in there so you do not have to look up your order number
                (unless you want to of course <b>up to you</b>)
              </p>
              <p class="has-text-info">
                <b>NOTE</b>: These information will auto-fill upon checkout :)
              </p>
              <p class="has-text-danger">
                <b>PLEASE DO NOT enter your actual information </b>. The only <b>RIGHT</b> information we need is your
                <b>ACTUAL EMAIL</b>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- Following Fast Tutorial -->
      <div class="column">
        <div class="card">
          <div class="card-content">
            <div class="content">
              <h1>Follow Fast Tutorial</h1>
              <p>
                By now you should be set up with an account and profile. So now you just need to:
                <ol>
                  <li>
                    <b>Pick your Items</b>
                  </li>
                  <li>
                    <b>Check Out</b>
                  </li>
                  <li>
                    <b>Check your Order</b>
                  </li>
                </ol>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

export default{
  name: 'Tutorial',
  data(){
    return{

    }
  }
}
</script>