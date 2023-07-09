<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <main>
      <router-view></router-view>
    </main>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    HeaderComponent,
    FooterComponent,
  },
});
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
