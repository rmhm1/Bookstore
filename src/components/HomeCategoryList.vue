<script setup lang="ts">
import { inject } from "vue";
import { BookItem } from "@/types";
import { CategoryItem } from "@/types";
const categoryList = inject("categoryList");
const homeBookList: BookItem[] = [
  {
    bookId: 1001,
    title: "The Final Gambit",
    author: "Jennifer Lynn Barnes",
    price: 699,
    isPublic: true,
  },
  {
    bookId: 1002,
    title: "Babel",
    author: "R.F. Kuang",
    price: 1399,
    isPublic: false,
  },
  {
    bookId: 1003,
    title: "The Stolen Hours",
    author: "Allen Eskens",
    price: 599,
    isPublic: true,
  },
  {
    bookId: 1004,
    title: "I'm Glad My Mom Died",
    author: "Jennette McCurdy",
    price: 699,
    isPublic: true,
  },
  {
    bookId: 1005,
    title: "Belladonna",
    author: "Adalyn Grace",
    price: 699,
    isPublic: true,
  },
];

const bookImageFileName = function (book: BookItem): string {
  let name = book.title.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpg`;
};

const categoryImageFileName = function (category: CategoryItem): string {
  let name = category.name.toLowerCase();
  name = name.replace(/ /g, "-");
  name = name.replace(/'/g, "");
  return `${name}.jpg`;
};
</script>

<style scoped>
ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5rem;
}

li {
  text-align: center;
  cursor: pointer;
}

li div {
  padding: 0.5em 0;
  background: rgba(0, 0, 0, 0.5); /* last # is percent opacity */
  color: white;
  transform: translateY(-2.25em);
  margin-bottom: -2em;
}

.book-info {
  list-style-type: none;
  color: black;
  font-weight: 600;
  font-size: 15px;
  display: block;
}
.book-info:nth-child(2) {
  list-style-type: none;
  color: #b7b7b7;
  font-size: 12px;
  font-weight: 100;
}
</style>

<template>
  <ul>
    <!--    <li v-for="category in categoryList" :key="category.categoryId">-->
    <!--      <router-link :to="'../category/' + category.name">-->
    <!--        <img-->
    <!--          :src="-->
    <!--            require('@/assets/images/categories/' +-->
    <!--              categoryImageFileName(category))-->
    <!--          "-->
    <!--          :alt="category.name + 'category'"-->
    <!--        />-->
    <!--        <div>{{ category.name }}</div>-->
    <!--      </router-link>-->
    <!--    </li>-->
    <li v-for="book in homeBookList" :key="book.bookId">
      <!--      <router-link :to="'../category/'"> </router-link>-->
      <img
        :src="require('@/assets/images/books/' + bookImageFileName(book))"
        :alt="book.title"
        width="180"
        height="180"
      />
      <ul class="book-info">
        <li class="book-info">{{ book.title }}</li>
        <li class="book-info">{{ book.author }}</li>
      </ul>
    </li>
  </ul>
</template>
