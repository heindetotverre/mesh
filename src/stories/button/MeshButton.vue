<template>
  <button
    :class="['button', domclass]"
    :disabled="disabled"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
  import shareableProps from "../shareableProps"
  const props = defineProps(shareableProps)
</script>

<style lang="scss" scoped>
@import "../../assets/variables.scss";
.button {
  border: 0;
  border-radius: $border-radius-md;
  cursor: pointer;
  display: inline-block;
  font-weight: $font-weight-heavy;
  padding: $margin calc(2 * $margin);
  transition: .4s ease;
  transition-property: 'background-color';

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.02);
  }

  &--primary {
      background-color: $color-grey-light;
  }

  &--secondary {
      background-color: $color-grey-dark;
      color: $color-white;
  }
}
</style>