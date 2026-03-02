<script setup>
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <TheHeader :settings-enabled="false" />
  <nav class="home__nav">
    <ul class="nav__list">
      <li class="nav__item">
        <RouterLink to="/collections" class="nav__link">Collections</RouterLink>
      </li>
      <li class="nav__item">
        <RouterLink to="/training" class="nav__link">Training</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.home__nav {
  display: grid;
  place-items: center;

  .nav__list {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 32px;

    .nav__item {
      width: 200px;
      padding: 1rem;
      border-radius: 5px;
      text-align: center;
      background-color: var(--main-color);
    }
  }
}
.nav__link {
  font-size: 2rem;
  color: var(--text-color);
}
</style>
