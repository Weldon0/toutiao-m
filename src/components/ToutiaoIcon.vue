<template>
  <i :class="['toutiao', `toutiao-${icon}`]"></i>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
  },
};
</script>

<style></style>
