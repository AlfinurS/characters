<template>
  <section class="container">
    <h2 class="headline">Персонажи</h2>
    <InputComponent
      @onInput="setSearch"
      icon="iconSearch"
      placeholder="Поиск"
    />
    <p class="content">{{ data.info.count }} персонажей</p>
    <div v-for="character in data.results" :key="character.id" class="list">
      <div class="list__wrapp">
        <img
          class="list__avatar"
          :src="getImage(character.image)"
          alt="image"
        />
        <p class="list__name">{{ character.name }}</p>
      </div>
      <iconMessage class="list__btn" />
    </div>
    <ButtonComponent
      @onClick="setSearch"
      iconRight="iconArrow"
      text="Показать еще"
    ></ButtonComponent>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { characterType, responseListType } from "@/types/common";
import axios from "axios";
import iconMessage from "@/components/icons/iconMessage.vue";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

const initData = (): responseListType => ({
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
});

export default defineComponent({
  name: "HomePage",
  components: {
    iconMessage,
    InputComponent,
    ButtonComponent,
  },
  data() {
    return {
      data: initData() as responseListType,
      search: "",
      characters: [] as characterType[],
      apiUrl: "https://rickandmortyapi.com/api/character",
    };
  },

  computed: {},

  methods: {
    loadCharacters(): void {
      const url = this.apiUrl;
      const params = {};
      axios
        .get(url, { params })
        .then(({ data }: { data: responseListType }) => {
          this.data = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    setSearch(data: string): void {
      this.search = data;
      const url = this.apiUrl;
      const params = {
        name: this.search,
      };
      axios
        .get(url, { params })
        .then(({ data }: { data: responseListType }) => {
          this.data = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getImage(image): string {
      return `${image}`;
    },
  },

  mounted() {
    this.loadCharacters();
  },
});
</script>

<style lang="scss" scoped>
.container {
  min-width: 325px;
}
</style>
