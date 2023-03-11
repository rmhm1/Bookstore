<script setup lang="ts">
import HomeCategoryList from "@/components/HomeCategoryList.vue";
</script>

<style scoped>
.home-page {
  display: flex;
}

.welcome-text {
  width: 20em;
}

.front-page-items {
  margin-left: 4rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0rem;
}

.call-to-action {
  align-self: center;
  /* margin: auto; */
  margin-top: 4rem;
  margin-bottom: 4rem;
  /*margin-left: -7rem;*/
}

.call-to-action button {
  background: #60909a;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border: none;
  border-radius: 9px;
  padding: 20px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-family: "Roboto";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  color: #ffffff;
  display: block;
  margin: auto;
}

.call-to-action button:hover {
  background: #355b63;
  cursor: pointer;
}

.call-to-action a {
  text-decoration: none;
}

.front-page-items div {
  display: flex;
  flex-direction: row;
}

.category-image-items {
  /* margin-top: 4rem; */
  /* margin-left: 4rem; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1em;
  align-items: center;
  justify-content: center;
  /* overflow: auto; */
  margin-right: 1rem;
}

.category-image-items a {
  text-align: center;
  cursor: pointer;
}

.category-image-items div {
  padding: 0.5em;
  /* background: rgba(0, 0, 0, 0.5);  */
  /* last # is percent opacity */
  color: black;
  margin-top: 2rem;
  transform: translateY(-2.25em);
  margin-bottom: -2em;
  font-family: "Roboto";
  font-weight: 600;
}

.category-image-items li {
  list-style-type: none;
  color: black;
  font-weight: 600;
  font-size: 15px;
}
.category-image-items li:nth-child(2) {
  list-style-type: none;
  color: #b7b7b7;
  font-size: 12px;
  font-weight: 100;
}

.front-page-selector {
  display: flex;
  flex-direction: row;
  gap: 4rem;
  color: black;
}

.front-page-selector div {
  gap: 4rem;
}

.front-page-links {
  font-size: 18px;
  color: black;
  font-family: "Roboto";
}

.front-page-links:visited {
  font-size: 18px;
  color: black;
  font-family: "Roboto";
}

.front-page-links:hover,
.front-page-links:active {
  text-decoration: underline;
}
</style>
<template>
  <div class="home-page">
    <section class="front-page-items">
      <div class="front-page-items front-page-selector">
        <router-link
          to="/"
          class="front-page-links"
          style="text-decoration: underline; font-weight: bold"
        >
          New Releases
        </router-link>
        <router-link to="/" class="front-page-links">Coming Soon</router-link>
        <router-link to="/" class="front-page-links">Best Selling</router-link>
        <router-link to="/" class="front-page-links">On Sale</router-link>
      </div>
      <div class="front-page-items">
        <h1>New Releases</h1>
      </div>
      <div class="category-image-items front-page-items">
        <i class="fa-solid fa-angle-left" style="font-size: 25px"></i>
        <home-category-list></home-category-list>
        <i class="fa-solid fa-angle-right" style="font-size: 25px"></i>
      </div>
    </section>
  </div>
  <section class="call-to-action">
    <!--    <div class="call-to-action">-->
    <!--      <button>SHOP ALL BOOKS</button>-->
    <!--    </div>-->
    <router-link to="category/Fantasy"
      ><button>SHOP ALL BOOKS</button></router-link
    >
  </section>
  <!--    <section class="category-images container">-->
  <!--      <home-category-list></home-category-list>-->
  <!--    </section>-->
  <!--  </div>-->
</template>
