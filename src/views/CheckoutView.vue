<script setup lang="ts">
import { reactive, Ref } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  helpers,
  maxLength,
  minLength,
  required,
  email,
} from "@vuelidate/validators";
import { asDollarsAndCents } from "@/utils";
import { useCategoryStore } from "@/stores/CategoryStore";
const categoryStore = useCategoryStore();
import { useCartStore } from "@/stores/CartStore";
const cartStore = useCartStore();
const cart = cartStore.cart;
import { isCreditCard, isMobilePhone } from "@/utils";
import CheckoutFieldError from "@/components/CheckoutFieldError.vue";
import router from "@/router";

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  ccNumber: "",
  ccExpiryMonth: new Date().getMonth() + 1,
  ccExpiryYear: new Date().getFullYear(),
  checkoutStatus: "",
});

const rules = {
  name: {
    required: helpers.withMessage("Please provide a name.", required),
    minLength: helpers.withMessage(
      "Name must have at least 4 letters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Name can have at most 45 letters.",
      maxLength(45)
    ),
  },
  //   TODO: Add more validations for these and other fields that need more validation.
  phone: {
    required: helpers.withMessage("Please provide a phone number.", required),
    phone: helpers.withMessage(
      "Please provide a valid phone number.",
      (value: string) => !helpers.req(value) || isMobilePhone(value)
    ),
  },
  address: {
    required: helpers.withMessage("Please provide an address.", required),
    minLength: helpers.withMessage(
      "Address must have at least 4 letters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Address can have at most 45 letters.",
      maxLength(45)
    ),
  },
  ccExpiryMonth: {},
  ccExpiryYear: {},
  ccNumber: {
    required: helpers.withMessage(
      "Please provide credit card number.",
      required
    ),
    ccNumber: helpers.withMessage(
      "Please provide a valid credit card number.",
      (value: string) => !helpers.req(value) || isCreditCard(value)
    ),
  },
  email: {
    required: helpers.withMessage("Please provide an email address.", required),
    email: helpers.withMessage("Please provide a valid email address", email),
  },
};
const $v = useVuelidate(rules, form);

async function submitOrder() {
  console.log("Submit order");
  const isFormCorrect = await $v.value.$validate();
  if (!isFormCorrect) {
    form.checkoutStatus = "ERROR";
  } else {
    form.checkoutStatus = "PENDING";
    await cartStore
      .placeOrder({
        name: form.name,
        address: form.address,
        phone: form.phone,
        email: form.email,
        ccNumber: form.ccNumber,
        ccExpiryMonth: form.ccExpiryMonth,
        ccExpiryYear: form.ccExpiryYear,
      })
      .then(() => {
        form.checkoutStatus = "OK";
        // cartStore.clearCart();
        router.push({ name: "confirmation-view" });
      })
      .catch((reason) => {
        form.checkoutStatus = "SERVER_ERROR";
        console.log("Error placing order", reason);
      });
  }
}

/* NOTE: For example yearFrom(0) == <current_year> */
function yearFrom(index: number) {
  return new Date().getFullYear() + index;
}
</script>

<style scoped>
/* TODO: Adapt these styles to your page */
.checkout-page {
  /*background: rgba(105, 100, 100, 0.5);*/
  /*color: #00a0a0;*/
  color: black;
  display: flex;
  flex-direction: column;
  font-weight: 400;
}

.above-info {
  text-align: center;
  font-size: 18px;
  font-family: Roboto;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.checkout-page-body {
  display: flex;
  flex-direction: row;
  padding: 1em;
}

form {
  display: flex;
  flex-direction: column;
}

form > div {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5em;
}

form > input {
  align-self: center;
  font-size: 0.8rem;
  margin-top: 1rem;
}

form > div > input,
form > div > select {
  background-color: #f1f1f1;
  margin-left: 0.5em;
  color: black;
  border: 2px solid #60909a;
  border-radius: 5px;
  /*padding: 0.2em;*/
}

/*form > .error {*/
/*  color: red;*/
/*  text-align: right;*/
/*}*/

.checkoutStatusBox {
  color: #a00000;
  font-weight: bold;
  margin: 1em;
  padding-top: 0.5rem;
  /*text-align: left;*/
}
.checkout-details {
  padding-top: 5rem;
  padding-left: 8rem;
}

.checkout-button {
  /*margin-top: 2rem;*/
  /*padding: 8px 12px 8px 8px;*/
  /*gap: 10px;*/
  /*border: 3px solid #00a0a0;*/
  /*filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));*/
  /*border-radius: 9px;*/
  /*background-color: white;*/
  /*color: #00a0a0;*/
  /*font-weight: bold;*/
  /*font-size: 16px;*/
  margin-top: 2rem;
  padding: 12px 12px 12px 12px;
  gap: 10px;
  /*border: 3px solid #60909a;*/
  border: none;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 9px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  background-color: #60909a;
  cursor: pointer;
}

.checkout-button:hover {
  background: #355b63;
}

.continue-shopping {
  padding: 8px 12px 8px 8px;
  gap: 10px;
  border: 3px solid #60909a;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 9px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  background: #60909a;
}

.continue-shopping:hover {
  color: #00a0a0;
  border-color: #00a0a0;
}
</style>

<template>
  <div class="checkout-page">
    <!-- TODO: Add an HTML section to display when checking out with an empty cart -->
    <section class="above-info" v-if="cart.empty">
      Please add an item to your cart to checkout.
      <br />
      <div style="text-align: center; padding-bottom: 2rem; padding-top: 2rem">
        <router-link
          :to="{
            name: 'category-view',
            params: {
              name: categoryStore.categoryName,
            },
          }"
          ><button class="continue-shopping">
            Continue Shopping
          </button></router-link
        >
      </div>
    </section>
    <section class="checkout-page-body" v-if="!cart.empty">
      <form @submit.prevent="submitOrder">
        <div>
          <label for="name">Name</label>
          <input
            type="text"
            size="20"
            id="name"
            name="name"
            v-model.lazy="$v.name.$model"
          />
        </div>
        <CheckoutFieldError field-name="name" :validator="$v" />
        <!-- TODO: Add address input and validation messages -->

        <div>
          <label for="address">Address</label>
          <input
            type="text"
            size="20"
            id="name"
            name="name"
            v-model.lazy="$v.address.$model"
          />
        </div>
        <CheckoutFieldError field-name="address" :validator="$v" />

        <div>
          <label for="phone">Phone</label>
          <input
            class="textField"
            type="text"
            size="20"
            id="phone"
            name="phone"
            v-model.lazy="$v.phone.$model"
          />
        </div>
        <!-- TODO: Add phone validation message(s) -->
        <CheckoutFieldError field-name="phone" :validator="$v" />

        <div>
          <label for="email">Email</label>
          <input
            type="text"
            size="20"
            id="email"
            name="email"
            v-model.lazy="$v.email.$model"
          />
        </div>
        <CheckoutFieldError field-name="email" :validator="$v" />

        <div>
          <label for="ccNumber">Credit card</label>
          <input
            type="text"
            size="20"
            id="ccNumber"
            name="ccNumber"
            v-model.lazy="$v.ccNumber.$model"
          />
        </div>
        <CheckoutFieldError field-name="ccNumber" :validator="$v" />

        <div>
          <label>Exp Month</label>
          <select v-model="$v.ccExpiryMonth.$model">
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="index + 1"
            >
              {{ month }} ({{ index + 1 }})
            </option>
          </select>
          <select v-model="form.ccExpiryYear">
            <option
              v-for="index in 10"
              :key="index"
              :value="yearFrom(index - 1)"
            >
              {{ yearFrom(index - 1) }}
            </option>
          </select>
        </div>

        <!--        <div>-->
        <!--          <label>Exp Year</label>-->
        <!--          <select>-->
        <!--            &lt;!&ndash; TODO: Complete this select tag for 'ccExpiryYear'. &ndash;&gt;-->
        <!--          </select>-->
        <!--        </div>-->
        <!-- TODO (style): Use a single label for both month and date and put the on the same line. -->
        <!-- TODO (style): For example: Exp Date {Month} {Year}, with space between month/year selectors. -->

        <input
          type="submit"
          name="submit"
          class="checkout-button"
          :disabled="form.checkoutStatus === 'PENDING'"
          value="Complete Purchase"
        />
        <!-- TODO (style): The submit button should not take up the entire width of the form. -->
        <!-- TODO (style): The submit button should be styled consistent with your own site. -->
      </form>
      <!-- TODO (style): Fix error message placement so they nearer to the correct fields. -->
      <!-- TODO (style): HINT: Use another <div> and label, input, and error, and use flexbox to style. -->

      <!-- TODO: Display the cart total, subtotal and surcharge. -->
      <section class="checkout-details">
        Your credit card will be charged
        <strong>{{ asDollarsAndCents(cart.subtotal + cart.surcharge) }}</strong>
        <br />
        (<strong> {{ asDollarsAndCents(cart.subtotal) }}</strong> +
        <strong> {{ asDollarsAndCents(cart.surcharge) }} </strong> shipping)
      </section>
    </section>
    <section v-show="form.checkoutStatus !== ''" class="checkoutStatusBox">
      <div v-if="form.checkoutStatus === 'ERROR'">
        Error: Please fix the problems above and try again.
      </div>

      <div v-else-if="form.checkoutStatus === 'PENDING'">Processing...</div>

      <div v-else-if="form.checkoutStatus === 'OK'">Order placed...</div>

      <div v-else>An unexpected error occurred, please try again.</div>
    </section>
  </div>
</template>
