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

  &:hover {
    background-color: $color-grey-normal;
  }

  &--primary {
      background-color: $color-grey-light;
  }

  &--secondary {
      background-color: $color-grey-dark;
  }
}
</style>