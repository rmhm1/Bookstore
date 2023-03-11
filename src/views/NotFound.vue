<template>
  <div id="confirmation-invalid">
    We're sorry, but the page you were looking for was not found.
    <router-link
      :to="{
        name: 'home-view',
      }"
    >
      <button class="continue-shopping">Go to Home Page</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
#confirmation-invalid {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: black;
  padding: 3rem;
  align-items: center;
  gap: 3rem;
}

.continue-shopping {
  padding: 8px 12px 8px 8px;
  gap: 10px;
  border: 3px solid #60909a;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 9px;
  font-weight: bold;
  font-size: 16px;
  color: white;
  background: #60909a;
}

.continue-shopping:hover {
  color: #00a0a0;
  border-color: #00a0a0;
}
</style>
