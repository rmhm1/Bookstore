<script setup lang="ts">
import { useCartStore } from "@/stores/CartStore";
import { useCategoryStore } from "@/stores/CategoryStore";
import { asDollarsAndCents } from "@/main";
const categoryStore = useCategoryStore();
const cartStore = useCartStore();
import { BookItem } from "@/types";
const getBookImageUrl = function (book: BookItem): string {
  let filename = book.title.toLowerCase();
  filename = filename.replace(/:/g, "");
  filename = filename.replace(/,/g, "");
  filename = filename.replace(/\./g, "");
  filename = filename.replace(/ /g, "-");
  filename = filename.replace(/'/g, "");
  filename = filename + ".jpg";
  try {
    return require("@/assets/images/books/" + filename);
  } catch (_) {
    return require("@/assets/images/books/no-img-139-187.jpg");
  }
};
// TODO If necessary, replace the above function with the "bookImageFileName" function
//  TODO from your CategoryBookListItem component.

const updateCart = function (book: BookItem, quantity: number) {
  // cartStore.cart.update(book, quantity);
  cartStore.updateBookQuantity(book, quantity);
};
// TODO The above function calls through directly to the shopping cart, which means it does not update local storage.
// TODO Change the implementation so that it uses the appropriate action from the cart storage.
</script>

<style scoped>
.cart-table {
  display: grid;
  grid-template-columns: max-content minmax(10em, 20em) repeat(3, max-content);
  row-gap: 1em;
  width: fit-content;
  margin: 0 auto;
  background-color: aliceblue;
  align-items: center;
}

ul {
  display: contents;
}

ul > li {
  display: contents;
}

.table-heading {
  background-color: #333;
  color: white;
}

.table-heading > * {
  background-color: #333;
  padding: 0.5em;
}

.heading-book {
  grid-column: 1 / 3;
}

.heading-price {
  grid-column: 3 / 5;
  text-align: right;
}

.heading-subtotal {
  text-align: right;
  grid-column: -2 / -1;
}

.cart-book-image {
  padding: 0 1em;
}

.cart-book-image > * {
  margin-left: auto;
  margin-right: 0;
}

img {
  display: block;
  width: 100px;
  height: auto;
}
/* TODO The width above is for book images that are normally 200px wide. Change this (if necessary) */
/* TODO to accommodate your own book images. the rule of thumb is that the image here should be about */
/* TODO half the size of the book images as they appear on your category page. */

.cart-book-price {
  padding-left: 1em;
  text-align: right;
}

.cart-book-quantity {
  padding-left: 1em;
  padding-right: 1em;
}

.cart-book-subtotal {
  text-align: right;
  padding-left: 1em;
  padding-right: 1em;
}

/* Row separators in the table */

.line-sep {
  display: block;
  height: 2px;
  background-color: gray;
  grid-column: 1 / -1;
}

/* Increment/decrement buttons */

/* TODO Consider using icon buttons for your increment and decrement buttons. */
/* TODO Modify the CSS here to suit your own design. */
/* TODO In particular, you may or may not have custom properties */
/* TODO primary-color and primary-color-dark defined in your global CSS file. */
.icon-button {
  border: none;
  cursor: pointer;
}

.inc-button {
  font-size: 1.125rem;
  color: var(--primary-color);
  margin-right: 0.25em;
  border: none;
  background: none;
}

.inc-button:hover {
  color: var(--primary-color-dark);
}

.dec-button {
  font-size: 1.125rem;
  color: #a00000;
  border: none;
  background: none;
}

.dec-button:hover {
  color: #aaa;
}

select {
  background-color: var(--primary-color);
  color: white;
  border: 2px solid var(--primary-color-dark);
  border-radius: 3px;
}

.price-info {
  text-align: center;
  font-size: 18px;
  font-family: Roboto;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.above-info {
  text-align: center;
  font-size: 18px;
  font-family: Roboto;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.button-area {
  /*justify-content: space-between;*/
  /*justify-content: space-evenly;*/
  justify-content: space-evenly;
  padding-bottom: 2rem;
  padding-left: 4.5rem;
  display: flex;
  flex-direction: row;
}

.continue-shopping {
  padding: 8px 12px 8px 8px;
  gap: 10px;
  border: 3px solid #60909a;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 9px;
  background-color: white;
  color: #60909a;
  font-weight: bold;
  font-size: 16px;
  color: white;
  background: #60909a;
}

.checkout-button {
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

/*.continue-shopping {*/
/*  padding: 8px 12px 8px 8px;*/
/*  gap: 10px;*/
/*  border: 3px solid #60909a;*/
/*  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));*/
/*  border-radius: 9px;*/
/*  font-weight: bold;*/
/*  font-size: 16px;*/
/*  background-color: white;*/
/*  color: #60909a;*/
/*  cursor: pointer;*/
/*}*/

.continue-shopping:hover {
  color: #00a0a0;
  border-color: #00a0a0;
}

.clear-cart {
  padding: 8px 12px 8px 8px;
  gap: 10px;
  border: 3px solid #00a0a0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 9px;
  font-weight: bold;
  font-size: 16px;
  background-color: white;
  color: #00a0a0;
  cursor: pointer;
}

.clear-cart:hover {
  color: #60909a;
  border-color: #60909a;
}

.empty-cart {
}
</style>

<template>
  <div class="above-info" v-if="cartStore.count > 1">
    Your shopping cart contains {{ cartStore.cart.numberOfItems }} items.
  </div>
  <div class="above-info" v-else-if="cartStore.count === 1">
    Your shopping cart contains {{ cartStore.cart.numberOfItems }} item.
  </div>
  <div class="above-info" v-else>Your shopping cart is empty.</div>

  <div class="cart-table" v-if="!cartStore.cart.empty">
    <ul>
      <li class="table-heading">
        <div class="heading-book">Book</div>
        <div class="heading-price">Price / Quantity</div>
        <div class="heading-subtotal">Amount</div>
      </li>
      <template v-for="item in cartStore.cart.items" :key="item.book.bookId">
        <li>
          <div class="cart-book-image">
            <img :src="getBookImageUrl(item.book)" :alt="item.book.title" />
          </div>
          <div class="cart-book-title">{{ item.book.title }}</div>
          <div class="cart-book-price">
            {{ asDollarsAndCents(item.book.price) }}
          </div>
          <div class="cart-book-quantity">
            <button
              class="dec-button"
              @click="updateCart(item.book, item.quantity - 1)"
            >
              <i class="fas fa-minus-circle"></i>
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button
              class="inc-button"
              @click="updateCart(item.book, item.quantity + 1)"
            >
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
          <div class="cart-book-subtotal">
            {{ asDollarsAndCents(item.quantity * item.book.price) }}
          </div>
        </li>
        <li class="line-sep"></li>
      </template>
    </ul>
  </div>
  <div class="price-info" v-if="!cartStore.cart.empty">
    <p>Cart subtotal: {{ asDollarsAndCents(cartStore.cart.subtotal) }}</p>
  </div>
  <div class="button-area" v-if="!cartStore.cart.empty">
    <button class="clear-cart" @click="cartStore.cart.clear()">
      Clear Cart
    </button>
    <router-link
      :to="{
        name: 'category-view',
        params: {
          name: categoryStore.categoryName,
        },
      }"
      ><button class="continue-shopping">Continue Shopping</button></router-link
    >
    <router-link to="/checkout"
      ><button class="checkout-button">Proceed to checkout</button></router-link
    >
  </div>
  <div style="text-align: center; padding-bottom: 2rem" v-else>
    <router-link
      :to="{
        name: 'category-view',
        params: {
          name: categoryStore.categoryName,
        },
      }"
      ><button class="continue-shopping">Continue Shopping</button></router-link
    >
  </div>
</template>
