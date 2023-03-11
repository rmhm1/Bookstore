<script setup lang="ts">
import ConfirmationTable from "@/components/ConfirmationTable";

import { useCategoryStore } from "@/stores/CategoryStore";
const categoryStore = useCategoryStore();

import { asDollarsAndCents } from "@/utils";

import { useCartStore } from "@/stores/CartStore";
const cartStore = useCartStore();

import { useOrderDetailsStore } from "@/stores/OrderDetailsStore";
import { computed } from "vue";
const orderDetailsStore = useOrderDetailsStore();
const orderDetails = orderDetailsStore.orderDetails;

const orderDateTime = computed(function () {
  let date = new Date(orderDetails.order.dateCreated);
  return date.toLocaleTimeString();
});

const orderDate = computed(function () {
  let date = new Date(orderDetails.order.dateCreated);
  return date.toLocaleDateString();
});

const ccExpDate = computed(function (): Date {
  return new Date(orderDetails.customer.ccExpDate);
});

const ccExpYear = computed(function (): number {
  return ccExpDate.value.getFullYear();
});

const ccExpMonth = computed(function (): string {
  let month = ccExpDate.value.getMonth() + 1;
  let result = "" + month;
  if (month < 10) {
    result = "0" + month;
  }
  return result;
});
</script>

<style scoped>
#confirmationView {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  margin: 1em auto;
  padding-left: 2rem;
  justify-content: space-around;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
ul {
  text-align: left;
}
ul > li {
  margin: 0.25em;
}

.confirmation-info {
  background: #00a0a0;
  color: white;
  padding: 2rem;
  border-radius: 9px;
  text-align: center;
  /*max-width: 25%;*/
}

.personal-info {
  background: #60909a;
  color: white;
  padding: 2.2rem;
  border-radius: 9px;
  text-align: center;
  /*max-width: 25%;*/
}
#confirmation-invalid {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: black;
  padding: 3rem;
  align-items: center;
  gap: 3rem;
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

.order-detail-section {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  /*align-items: start;*/
}
/*.order-detail-section ul {*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  gap: 8rem;*/
/*}*/
.pricing {
  display: flex;
  /*flex-flow: row wrap;*/
  flex-direction: row;
  /*gap: 20rem;*/
  /*gap: 5rem;*/
  /*gap: 100%;*/
  justify-content: space-between;
  /*justify-content: right;*/
  /*align-content: flex-end;*/
}
.pricing-name {
  /*float: right;*/
  /*flex: 0 1 auto;*/
}
</style>

<template>
  <div v-if="!orderDetailsStore.hasOrderDetails()" id="confirmation-invalid">
    We're sorry, but the order you requested could not be found.
    <router-link
      :to="{
        name: 'home-view',
      }"
    >
      <button class="continue-shopping">Go to Home Page</button>
    </router-link>
  </div>

  <div id="confirmationView" v-else>
    <section class="info-section">
      <section class="confirmation-info">
        <ul>
          <li>Confirmation #: {{ orderDetails.order.confirmationNumber }}</li>
          <li>Time: {{ orderDateTime + ", " + orderDate }}</li>
        </ul>
      </section>
      <section class="personal-info">
        <p style="font-weight: 600">Your Information:</p>
        <ul>
          <li>{{ orderDetails.customer.customerName }}</li>
          <li>{{ orderDetails.customer.address }}</li>
          <li>{{ orderDetails.customer.email }}</li>
          <li>
            {{
              "**** **** **** " +
              orderDetails.customer.ccNumber.substring(
                orderDetails.customer.ccNumber.length - 4
              ) +
              " (" +
              (new Date(orderDetails.customer.ccExpDate).getMonth() + 1) +
              "-" +
              new Date(orderDetails.customer.ccExpDate).getFullYear() +
              ")"
            }}
          </li>
        </ul>
      </section>
    </section>
    <section class="order-detail-section">
      <p style="font-weight: 700; color: #a00000; font-size: x-large">
        Order Details:
      </p>
      <confirmation-table> </confirmation-table>
      <ul>
        <li class="pricing">
          <div>Subtotal:</div>
          <div class="pricing-name">
            {{
              asDollarsAndCents(
                orderDetails.order.amount - cartStore.cart.surcharge
              )
            }}
          </div>
        </li>
        <li class="pricing">
          <div>Surcharge:</div>
          <div class="pricing-name">
            {{ asDollarsAndCents(cartStore.cart.surcharge) }}
          </div>
        </li>
        <hr />
        <li class="pricing">
          <div>Total:</div>
          <div class="pricing-name">
            {{ asDollarsAndCents(orderDetails.order.amount) }}
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
