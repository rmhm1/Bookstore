<script setup lang="ts">
import { useBookStore } from "@/stores/BookStore";
import CategoryBookListItem from "@/components/CategoryBookListItem.vue";
const BookStore = useBookStore();
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1em;
  row-gap: 2em;
  column-gap: 4em;
  margin-left: 5rem;
}
</style>

<template>
  <section class="category-book-list">
    <ul>
      <template v-for="book in BookStore.bookList" :key="book.bookId">
        <category-book-list-item :book="book"></category-book-list-item>
      </template>
    </ul>
  </section>
</template>
