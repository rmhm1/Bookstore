<script setup lang="ts"></script>

<style scoped>
footer {
  /* background: var(--secondary-background-color);*/
  background: #60909a;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.links,
.social-media-icons {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  color: white;
}

.social-media-icons {
  text-align: center;
  gap: 1rem;
  align-items: center;
  color: white;
}

.social-media-links {
  font-size: 18px;
  color: white;
}

.social-media-links:hover,
.social-media-links:active {
  color: #a00000;
}

.copyright {
  color: white;
  font-size: 14px;
}

.info-links {
  font-family: "Roboto";
  /* text-decoration: underline; */
  text-decoration: none;
  font-size: 14px;
  gap: 1rem;
  color: white;
}

.info-links:hover,
.info-links:active {
  text-decoration: underline;
  color: #a00000;
}
</style>

<template>
  <footer class="container">
    <section class="copyright">
      <p>
        <i
          style="margin-right: 10px; font-size: 18px"
          class="fa-solid fa-copyright"
        ></i
        >Book Cove
      </p>
    </section>
    <section class="links">
      <router-link to="/" class="info-links">About |</router-link>
      <router-link to="/" class="info-links">Contact |</router-link>
      <router-link to="/" class="info-links">Support |</router-link>
      <router-link to="/" class="info-links">Privacy Policy |</router-link>
      <router-link to="/" class="info-links">Credits</router-link>
    </section>
    <section class="social-media-icons">
      <div style="color: white; font-size: 14px; font-family: 'Roboto'">
        Follow Us
      </div>
      <router-link to="/" class="social-media-links"
        ><i class="fa-brands fa-twitter"></i
      ></router-link>
      <router-link to="/" class="social-media-links"
        ><i class="fa-brands fa-instagram"></i
      ></router-link>
      <router-link to="/" class="social-media-links"
        ><i class="fa-brands fa-square-facebook"></i
      ></router-link>
    </section>
  </footer>
</template>
