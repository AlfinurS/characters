<template>
  <header class="header"></header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {},

  data() {
    return {
      isShowMenu: false,
    };
  },
});
</script>
