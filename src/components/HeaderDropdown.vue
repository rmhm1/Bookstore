<script setup lang="ts">
// import { inject } from "vue";
// const categoryList = inject("categoryList");
import { useCategoryStore } from "@/stores/CategoryStore";
const CategoryStore = useCategoryStore();
CategoryStore.fetchCategories();
</script>

<style scoped>
.header-dropdown {
  position: relative;
}

.categories-button {
  padding: 8px 12px 8px 8px;
  gap: 10px;
  border: 3px solid #00a0a0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 9px;
  background-color: white;
  color: #00a0a0;
  font-weight: bold;
  font-size: 16px;
}

.categories-button:hover {
  color: #60909a;
  border-color: #60909a;
}

.header-dropdown ul {
  background-color: white;
  color: black;
  display: none;
  text-align: center;
  /* right: 0; */
}

.header-dropdown li {
  padding: 0.25em 0.5em;
  /* border-bottom: 1px solid grey; */
}

.header-dropdown a {
  color: black;
  text-decoration: none;
}

.header-dropdown li:hover {
  background: lightgray;
}

.header-dropdown:hover ul {
  display: block;
  position: absolute;
  min-width: 8em;
  z-index: 1;
  cursor: pointer;
}
</style>

<template>
  <div class="header-dropdown">
    <button class="button categories-button">
      Categories<i
        style="margin-left: 5px; color: black"
        class="fa-solid fa-caret-down"
      ></i>
    </button>
    <ul>
      <li
        v-for="category in CategoryStore.categoryList"
        :key="category.categoryId"
      >
        <router-link :to="'../category/' + category.name">
          {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
