<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  collection: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <div class="collection-thumbnail">
    <RouterLink :to="`/collections/${collection.slug}`" class="collection__link green-mark"
      ><span class="green-mark">{{ collection.name }}</span></RouterLink
    >
  </div>
</template>
<style scoped>
.collection-thumbnail {
  display: grid;
  place-items: center;
  height: 96px;
  min-width: 64px;
  font-family: var(--primary-font);
  font-size: var(--title-medium);

  .collection__link {
    --padding-inline: 20px;

    grid-area: 1/1;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 var(--padding-inline);

    .green-mark {
      position: relative;
      overflow-wrap: break-word;
      max-width: calc(100vw - (var(--items-viewer-gap) + var(--padding-inline)) * 2);

      &::before {
        content: '';
        height: 100%;
        width: 100%;
        position: absolute;
        inset: 0;
        z-index: -1;

        border-radius: 22% 25% 13% 18%;
        background:
          conic-gradient(at 0 100%, var(--mark-color) 1%, #fff0 3%) no-repeat 0 0 / auto 120%,
          conic-gradient(from 180deg at 100% 0, #fff0, var(--mark-color) 1%, #fff0 4%) no-repeat
            100% 100% / auto 120%,
          linear-gradient(
              var(--mark-bg-angle),
              color-mix(in srgb, var(--mark-color), transparent 40%),
              color-mix(in srgb, var(--mark-color), transparent 80%) 75%,
              color-mix(in srgb, var(--mark-color), transparent 45%)
            )
            no-repeat center / auto;
        clip-path: shape(
          from 0 10%,
          curve to 50% 20% with 23% 6%,
          curve to 100% 15% with 76% 47%,
          vline to 100%,
          curve to 50% 85% with 76% 95%,
          curve to 0 90% with 12% 70%,
          close
        );
        scale: 0.92;
        transform: skew(7deg);
        --mark-color: rgb(91 233 199);
        --mark-bg-angle: 30deg;
      }
    }
  }
  &::after,
  &::before {
    --size: 100%;

    grid-area: 1/1;
    content: '';
    background-color: var(--text-color);
    height: var(--size);
    width: var(--size);
  }
  &::before {
    z-index: -10;
  }
  &::after {
    --thickness: 3px;
    z-index: -5;
    background-color: #f0f9ff;
    height: calc(var(--size) - var(--thickness));
    width: calc(var(--size) - var(--thickness));
  }
}
@supports (clip-path: shape(from 0 0, line to 100% 0, line to 100% 100%, line to 0 100%, close)) {
  .collection-thumbnail::after,
  .collection-thumbnail::before {
    clip-path: shape(
      evenodd from 2% 1%,
      line to 39% 1%,
      line to 80% 0%,
      line to 94% 1%,
      curve to 100% 4% with 99% 1%,
      line to 99% 39%,
      line to 98% 89%,
      line to 97% 95%,
      curve to 92% 101% with 96% 99%,
      line to 78% 99%,
      line to 34% 98%,
      line to 8% 99%,
      curve to 1% 90% with 2% 99%,
      line to 1% 82%,
      line to 2% 61%,
      line to 1% 12%,
      curve to 5% 1% with 1% 1%
    );
  }
}
@supports not (
  clip-path: shape(from 0 0, line to 100% 0, line to 100% 100%, line to 0 100%, close)
) {
  .collection-thumbnail::after,
  .collection-thumbnail::before {
    border: var(--thickness) solid var(--text-color);
    border-radius: 8px;
  }
}
</style>
