<script setup>
defineProps({
  target: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <button class="add-button" :popovertarget="`${target}-creator`">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -960 960 960">
      <path
        d="M152.722-485.854c52.464 12.721 103.713 25.847 193.21 26.224 123.262-6.39 234.701-25.066 354.875-30.029 60.632-2.514 97.91 5.533 111.23 18.79"
        style="stroke-width: 100; stroke-linecap: round; stroke-dasharray: none; stroke-opacity: 1"
        transform="translate(-16.654)"
      />
      <path
        d="M487.888-805.758c1.67 52.923 3.338 103.061 5.007 152.858.093 149.236 11.789 307.174 0 447.499-4.163 19.312-3.485 30.556-16.274 64.244"
        style="stroke-width: 100; stroke-linecap: round; stroke-dasharray: none; stroke-opacity: 1"
        transform="translate(-16.654)"
      />
    </svg>
  </button>
</template>
<style>
:root {
  --button-radius: 64px;
}
</style>
<style scoped>
.add-button {
  position: fixed;
  bottom: 32px;
  right: 32px;
  display: grid;
  place-items: center;
  width: var(--button-radius);
  height: var(--button-radius);
  border-radius: 50%;
  background-color: var(--main-color);
  z-index: 10;
  filter: drop-shadow(2px 9px 13px rgb(0, 0, 0, 0.5));
  &.active {
    box-shadow: 0 0 0 4px rgba(42, 221, 96, 0.5);
  }
  &:disabled {
    background-color: #2add9b80;
    cursor: not-allowed;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -5;
    border-radius: 50%;
    background-color: #a9deff;

    clip-path: shape(
      from 50% 0,
      curve to 100% 50% with 96% 0%,
      curve to 50% 100% with 90% 105%,
      curve to 0% 50% with 7% 95%,
      curve to 50% 0% with 3% 1%,
      close
    );
  }
  &::before {
    height: calc(100% + 3px);
    width: calc(100% + 3px);
    background-color: var(--text-color);
  }
  &::after {
    height: calc(100% - 1px);
    width: calc(100% - 1px);
    background: conic-gradient(from 18deg at 10% 50%, #a9deff 15%, white 36%, #7eceff 66%);
  }
  svg {
    stroke: var(--text-color);
    width: calc(var(--button-radius) * 3 / 4);
    height: calc(var(--button-radius) * 3 / 4);
  }
}
</style>
