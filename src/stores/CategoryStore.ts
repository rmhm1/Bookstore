import { defineStore } from "pinia";
import { CategoryItem } from "@/types";
import { apiUrl } from "@/services/ApiServices";

const DEFAULT_CATEGORY_NAME = "Fantasy";

export const useCategoryStore = defineStore("CategoryStore", {
  state: () => ({
    categoryList: [] as CategoryItem[],
    selectedCategoryName: DEFAULT_CATEGORY_NAME as string,
  }),
  actions: {
    async fetchCategories() {
      // Fetch categories
      const url = apiUrl + "categories/";
      this.categoryList = await fetch(url).then((response) => response.json());
      // console.log(this.categoryList[0]);
    },
    async setSelectedCategoryName(selectedCategoryName: string) {
      this.selectedCategoryName = selectedCategoryName;
    },
  },
  // getters
  getters: {
    categoryName(): string {
      return this.selectedCategoryName || this.defaultCategoryName;
    },

    defaultCategoryName(): string {
      return DEFAULT_CATEGORY_NAME;
    },
  },
});
