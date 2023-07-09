<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { productType } from "@/types/common";
import { productConst } from "@/constants/common";

export default defineComponent({
  name: "ItemProduct",
  components: {},
  props: {
    dataProps: {
      type: Object as PropType<productType>,
      default: () => productConst,
    },
  },

  data() {
    return {
      products: [] as productType[],
    };
  },
});
</script>
