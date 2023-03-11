<script setup lang="ts">
import { defineProps } from "vue";
import { BookItem } from "@/types";
import { useCartStore } from "@/stores/CartStore";
import { asDollarsAndCents } from "@/main";
const CartStore = useCartStore();
const props = defineProps<{
  book: BookItem;
}>();
const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/:/g, "");
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpg`;
};
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
</script>
<style scoped>
.book-box {
  display: flex;
  flex-direction: column;
  background-color: var(--primary-background-color);
  padding: 1em;
  gap: 0.25em;
  border: 1px solid black;
  text-align: center;
  max-height: 22rem;
}

/*.book-title {*/
/*  font-weight: bold;*/
/*}*/

/*.book-author {*/
/*  font-style: italic;*/
/*}*/
</style>

<template>
  <li class="book-box">
    <div class="book-image">
      <img :src="getBookImageUrl(book)" :alt="book.title" />
      <div v-if="book.isPublic" class="read-now-overlay">
        <button class="read-now-overlay-button">Read Now</button>
      </div>
    </div>
    <div class="book-title">{{ book.title }}</div>
    <div class="book-author">{{ book.author }}</div>
    <!--    <div class="book-price">${{ (book.price / 100).toFixed(2) }}</div>-->
    <section class="book-info">
      <div class="book-price">{{ asDollarsAndCents(book.price) }}</div>
      <button class="buy-button" @click="CartStore.addToCart(book)">
        <i class="fa-solid fa-cart-plus"></i> Add
      </button>
    </section>
  </li>
</template>
