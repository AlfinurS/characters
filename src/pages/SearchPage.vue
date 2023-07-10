<template>
  <section class="page">
    <h2 class="page__title">Персонажи</h2>
    <InputComponent
      @onInput="setSearch"
      :dataProps="search"
      icon="iconSearch"
      placeholder="Поиск"
    />
    <p class="page__text" v-if="data.info.next">
      {{ data.info.count }} персонажей
    </p>
    <p class="page__text" v-if="!data.info.next">
      Не удалось найти персонажей с таким именем
    </p>
    <div class="page__list-wrapper">
      <div class="page__list">
        <div
          v-for="character in data.results"
          :key="character.id"
          class="page__item"
        >
          <div class="page__item-wrapp">
            <img
              class="page__item-avatar"
              :src="getImage(character.image)"
              alt="image"
            />
            <p class="page__item-name">{{ character.name }}</p>
          </div>
          <iconMessage class="page__item-btn" @click="showNotice(character)" />
        </div>
      </div>
      <ButtonComponent
        v-if="data.info.next"
        @onClick="loadCharacters"
        iconRight="iconArrow"
        text="Показать еще"
      ></ButtonComponent>

      <ButtonComponent
        v-if="search"
        @onClick="clearSearch"
        classProps="violet-btn"
        text="Сбросить поиск"
      ></ButtonComponent>
    </div>
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
  name: "SearchPage",
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
      let url = this.apiUrl;
      if (this.data.info.next) {
        url = this.data.info.next;
      }
      const params = {};
      axios
        .get(url, { params })
        .then(({ data }: { data: responseListType }) => {
          this.data.info = data.info;
          this.data.results.push(...data.results);
        })
        .catch(() => {
          this.data = initData();
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
        .catch(() => {
          this.data = initData();
        });
    },
    clearSearch(): void {
      this.search = "";
      this.data = initData();
      this.loadCharacters();
    },

    getImage(image): string {
      return `${image}`;
    },

    showNotice(character: characterType) {
      alert(character.species);
    },
  },

  mounted() {
    this.loadCharacters();
  },
});
</script>

<style lang="scss" scoped>
.page {
  &__title {
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    color: #221a51;
    text-align: center;
    margin-bottom: 16px;
    margin-top: 16px;
  }
  &__text {
    color: #c1c2c7;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  &__list {
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: 748px) {
      grid-template-columns: 1fr 1fr;
      gap: 18px;
    }
    @media (min-width: 1200px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    &-wrapper {
      margin-bottom: 40px;
    }
  }
  &__item {
    display: flex;
    padding: 15px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    border: 1px solid #f4f5f5;
    background: white;
    margin-top: 10px;
    margin-bottom: 10px;
    &-wrapp {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &-btn {
      cursor: pointer;
    }
    &-avatar {
      border-radius: 100px;
      margin-right: 20px;
      width: 50px;
      height: 50px;
    }
    &-name {
      color: #1d1d1d;
      font-size: 17px;
      font-weight: 700;
      line-height: normal;
    }
  }
}
</style>
