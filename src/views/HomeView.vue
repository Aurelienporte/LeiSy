<script setup>
import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <TheHeader :settings-enabled="false" />
  <nav class="home__nav">
    <ul class="nav__list">
      <li class="nav__item">
        <RouterLink to="/collections" class="nav__link green-mark">Collections</RouterLink>
      </li>
      <li class="nav__item">
        <RouterLink to="/training" class="nav__link green-mark">Training</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.home__nav {
  display: grid;
  place-items: center;

  .nav__list {
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-content: center;
    align-content: flex-start;
    height: 100%;
  }
}
.nav__link {
  --fontSize: 2rem;
  --paddingBlock: 16px;

  display: grid;
  place-content: center;
  font-size: var(--fontSize);
  padding-inline: 0;
  padding-block: var(--paddingBlock);
  height: calc(var(--fontSize) + var(--paddingBlock));
  position: relative;
  /* color: var(--text-color); */

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: 3px 5px 3px 5px;
    background:
      conic-gradient(at 0 100%, rgb(var(--mark-color) / 100%) 1%, #fff0 3%) no-repeat 0 0 / auto
        120%,
      conic-gradient(from 180deg at 100% 0, #fff0, rgb(var(--mark-color) / 100%) 1%, #fff0 4%)
        no-repeat 100% 100% / auto 120%,
      linear-gradient(
          var(--mark-bg-angle),
          rgb(var(--mark-color) / 60%),
          rgb(var(--mark-color) / 20%) 75%,
          rgb(var(--mark-color) / 55%)
        )
        no-repeat center / auto;
  }

  /* &.yellow-mark:before {
    rotate: 1deg;
    scale: 1.1;
    transform: skew(-5deg);
    --mark-color: 255 232 62;
    --mark-bg-angle: 50deg;
  } */

  &.green-mark:before {
    scale: 0.92;
    transform: skew(7deg);
    --mark-color: 91 233 92;
    --mark-bg-angle: 30deg;
  }
  /* &.red-mark:before {
    rotate: 0.5deg;
    transform: skew(5deg);
    --mark-color: 255 100 185;
    --mark-bg-angle: 150deg;
  } */
}
</style>
