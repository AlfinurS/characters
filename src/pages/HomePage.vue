<template>
  <section class="">
    <h2 class="">Персонажи</h2>

    <input
      v-model="search"
      type="text"
      class="catalog__search-input input"
      placeholder="Поиск товара"
      @input="loadCharacters"
    />

    <p>{{ data.info.count }} персонажей</p>
    <div v-for="character in data.results" :key="character.id" class="list">
      <img
        class=""
        :src="getImage(character.image)"
        alt="image"
        width="50"
        height="50"
      />
      <p>{{ character.name }}</p>
      <iconMessage class="list__btn" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { characterType, responseListType } from "@/types/common";
import axios from "axios";
import iconMessage from "@/components/icons/iconMessage.vue";

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
  },
  data() {
    return {
      data: initData() as responseListType,
      search: "",
      characters: [] as characterType[],
    };
  },

  computed: {},

  methods: {
    loadCharacters(): void {
      const url = "https://rickandmortyapi.com/api/character";
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

    getImage(image) {
      return `${image}`;
    },

    searchCharacter() {
      return this.characters;
    },
  },

  mounted() {
    this.loadCharacters();
  },
});
</script>
