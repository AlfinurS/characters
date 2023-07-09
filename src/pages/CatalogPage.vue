<template>
  <section class="navigation">
    <div class="navigation__wrapper">
      <h2 class="navigation__titel">Denim</h2>
      <nav>
        <ul class="navigation__list">
          <li class="navigation__item">
            <router-link class="navigation__link" :to="{ name: 'HomePage' }"
              >home/
            </router-link>
          </li>
          <li class="navigation__item">
            <a class="navigation__link" href="#">men /</a>
          </li>
          <li class="navigation__item">
            <a class="navigation__link navigation__link--active" href="#"
              >Denim</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "CatalogPage",
  components: {},
});
</script>
