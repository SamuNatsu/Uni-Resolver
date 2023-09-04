<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core';
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

/* Injects */
const { locale } = useI18n();
const localLang = useLocalStorage('language', 'en');

/* Constants */
const langs: { code: string; name: string }[] = [
  {
    code: 'en',
    name: 'English'
  },
  {
    code: 'zh',
    name: '中文'
  }
];

/* Watches */
watchEffect((): void => {
  localLang.value = locale.value;
});
</script>

<template>
  <div class="bg-white flex flex-col gap-4 p-4 rounded-md w-1/3">
    <h2 class="font-bold font-sans text-2xl">{{ $t('language') }}</h2>
    <div class="flex gap-4">
      <button
        v-for="i in langs"
        @click="locale = i.code"
        class="px-2 rounded-lg"
        :class="i.code === locale ? 'bg-green-100' : 'bg-blue-100 hover:bg-blue-200'"
        :disabled="i.code === locale"
        :key="i.code">
        {{ i.name }}
      </button>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  language: "Language"
zh:
  language: "语言"
</i18n>
