<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useCategoryStore } from "@/stores/CategoryStore";

// const url = apiUrl + "categories/";
// const categoryList: CategoryItem[] = await fetch(url).then((response) =>
//   response.json()
// );
// console.log(categoryList[0]);
const categoryStore = useCategoryStore();
categoryStore.fetchCategories();
// console.log(categoryStore.categoryList[0].name);
// provide("categoryList", categoryList);
</script>

<style></style>

<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>
