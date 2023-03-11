<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
import { useCategoryStore } from "@/stores/CategoryStore";
const CategoryStore = useCategoryStore();
</script>

<style scoped>
/*.category-buttons {*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*  text-align: center;*/
/*  background-color: var(--neutral-color);*/
/*}*/

/*.button.selected-category-button {*/
/*  background-color: var(--primary-color);*/
/*}*/

/*.button.unselected-category-button,*/
/*.button.unselected-category-button:visited {*/
/*  background-color: var(--neutral-color);*/
/*}*/

/*.button.unselected-category-button:hover,*/
/*.button.unselected-category-button:active {*/
/*  background-color: var(--primary-color);*/
/*}*/
</style>

<template>
  <nav class="category-nav">
    <div class="category-header">
      <div class="name">Genre</div>
      <div><i class="fa-solid fa-minus"></i></div>
    </div>
    <ul class="category-selection">
      <li
        v-for="category in CategoryStore.categoryList"
        :key="category.categoryId"
        class="category-options-unselected"
        :class="{
          'category-options-selected': category.name === route.params.name,
        }"
      >
        <router-link
          :to="{ name: 'category-view', params: { name: category.name } }"
        >
          {{ category.name }}
        </router-link>
      </li>
    </ul>
    <div class="category-header">
      <div class="name">Price</div>
      <div><i class="fa-solid fa-plus"></i></div>
    </div>
    <div class="category-header">
      <div class="name">Format</div>
      <div><i class="fa-solid fa-plus"></i></div>
    </div>
    <div class="category-header">
      <div class="name">Language</div>
      <div><i class="fa-solid fa-plus"></i></div>
    </div>
  </nav>
</template>
