<script setup>
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <nav class="home__nav">
    <ul class="nav__list">
      <li class="nav__item">
        <RouterLink to="/collections" class="nav__link" data-content="collections"
          >&Eacute;crire</RouterLink
        >
      </li>
      <li class="nav__item">
        <RouterLink to="/training" class="nav__link" data-content="training">Mémoriser</RouterLink>
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
    height: 100%;
    gap: var(--main-title-size);
    justify-content: center;
  }
}
.nav__item {
  text-align: center;
  z-index: 20;
}
.nav__link {
  --fontSize: 2rem;
  --paddingBlock: 6px;
  --link-width: 15rem;
  --link-height: 5rem;
  --link-color: oklch(95.117% 0.09534 138.733);

  display: grid;
  position: relative;
  place-items: center;
  position: relative;
  font-family: var(--primary-font);
  font-size: var(--fontSize);
  font-weight: 700;
  vertical-align: middle;
  justify-self: center;
  padding-inline: 12px;
  padding-block: var(--paddingBlock);
  background-color: transparent;
  width: var(--link-width);
  height: var(--link-height);
  min-width: fit-content;
  min-height: fit-content;

  &::before,
  &::after {
    content: '';
    position: absolute;
    z-index: -5;
    border-radius: 50%;
    background-color: var(--link-color);
  }
  &::before {
    background-color: var(--text-color);
    height: calc(var(--link-height) + 8px);
    width: calc(var(--link-width) + 8px);
  }
  &::after {
    height: calc(var(--link-height) + 4px);
    width: calc(var(--link-width) + 4px);
    background: conic-gradient(
      from 0deg at 10% 50%,
      var(--link-color) 15%,
      white 36%,
      var(--link-color) 66%
    );
  }
}
.nav__link[data-content='collections'] {
  &::before,
  &::after {
    clip-path: shape(
      from 1% 1%,
      curve to 8% 7% with 9% 21%,
      curve to 56% 2% with 48% 8%,
      curve to 86% 5% with 97% 0,
      line to 103% 92%,
      curve to 40% 86% with 76% 87%,
      curve to 1% 86% with 6% 86%,
      line to 10% 52%,
      close
    );
  }
}
.nav__link[data-content='training'] {
  &::before,
  &::after {
    clip-path: shape(
      from 0% 0%,

      line to 22% 7%,
      line to 85% 12%,
      line to 100% 59%,
      curve to 81% 86% with 98% 69%,
      curve to 5% 68% with -5% 86%,
      line to 10% 50%,
      line to 1% 0%
    );
  }
}
</style>
