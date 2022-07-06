<template>
  <div class="demo"><i :class="['toutiao', `toutiao-${icon}`]"></i></div>
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
