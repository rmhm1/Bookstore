<script setup lang="ts">
import HeaderDropdown from "@/components/HeaderDropdown.vue";
import { useCartStore } from "@/stores/CartStore";
const CartStore = useCartStore();
</script>

<style scoped>
header {
  background: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 1rem;
  gap: 0.5em;
  background-size: cover;
  border-bottom: solid #b2adad;
  border-bottom-width: thin;
  height: 100px;
  align-items: center;
}

.text-logo {
  font-family: var(--title-font-family);
}

.logo {
  /* font-family: var(--title-font-family); */
  display: flex;
  flex-direction: row;
  align-items: center;
}

.logo-text {
  font-family: var(--title-font-new);
  color: #00a0a0;
  font-size: 30px;
}

/*title-and-search-bar {*/
/*  display: flex;*/
/*  flex-direction: row;*/
/*}*/

.search-bar {
  padding: 0.5em;
  width: 30vw;
  /*padding: 10px;*/
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  /* width: 80%; */
  background: #f1f1f1;
}

.search-button {
  /* background-color: #00A0A0;
  filter: none;
  border: none;
  border-radius: 4px;
  padding: 8px; */
  float: left;
  /* width: 20%; */
  padding: 10px;
  background: #00a0a0;
  color: white;
  font-size: 14px;
  border: 1px solid grey;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
  /* float: right; */
}

.search-button:hover {
  background: #60909a;
}

.header-dropdown-and-cart {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.cart-button {
  border: 3px solid #00a0a0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 9px;
  background-color: white;
  color: #00a0a0;
  padding: 7px 15px 7px;
  /*padding: 7px;*/
  gap: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.cart-button:hover {
  /*border: 3px solid black;*/
  color: #60909a;
  border-color: #60909a;
}

.profile-button {
  border: 3px solid #00a0a0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 9px;
  background-color: white;
  padding: 5px;
  gap: 10px;
  color: #00a0a0;
  font-family: var(--default-font-family);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.profile-button:hover {
  color: #60909a;
  border-color: #60909a;
}

@media (max-width: 600px) {
  header {
    flex-direction: column;
  }
}
</style>

<template>
  <header class="container">
    <section class="logo">
      <router-link to="/">
        <img
          src="@/assets/images/site/bookstore-logo.png"
          alt="Another Bookstore Logo"
          width="100"
          height="auto"
        />
      </router-link>
      <router-link to="/" style="text-decoration: none">
        <h1 class="logo-text">Book Cove</h1>
      </router-link>
    </section>
    <section class="title-and-search-bar">
      <form action="category.html">
        <input
          type="text"
          class="search-bar"
          placeholder="Enter Keyword, Title, or Author"
        />
        <button type="submit" class="search-button">
          <i class="fa fa-search"></i>
        </button>
        <!-- <input type="submit" class="button search-button" value="Search" /> -->
      </form>
    </section>
    <section class="header-dropdown-and-cart">
      <!--      <button class="button">cart (2)</button>-->
      <!--      <button class="button">login</button>-->
      <header-dropdown></header-dropdown>
      <button class="profile-button">
        Profile<i
          style="margin-left: 10px; font-weight: bold"
          class="fa-regular fa-user"
        ></i>
      </button>
      <router-link to="/cart">
        <button class="cart-button">
          <i style="margin-right: 10px" class="fa-solid fa-bag-shopping"></i
          >{{ CartStore.count }}
        </button>
      </router-link>
    </section>
  </header>
</template>
