<template>
  <section class="navigation"></section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { productType } from "@/types/common";
import { axios } from "@/main";

export default defineComponent({
  name: "ProductPage",
  components: {},

  data() {
    return {
      productId: this.$route.params.id,
      products: [] as productType[],
    };
  },

  computed: {},

  methods: {
    loadProducts() {
      const url = "products.json";
      axios
        .get(url)
        .then(({ data }) => {
          this.products = data.products;
        })
        .catch(() => {
          //console.log(error);
        });
    },

    getImage(image) {
      return `${import.meta.env.BASE_URL}/img/new_product/${image}`;
    },
  },

  mounted() {
    this.loadProducts();
  },
});
</script>
