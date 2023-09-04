<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core';
import { onBeforeMount } from 'vue';
import { useI18n } from 'vue-i18n';

/* Injects */
const { locale } = useI18n();
const localLang = useLocalStorage<string>('language', 'en');

/* Life cycle */
onBeforeMount((): void => {
  locale.value = localLang.value;
});
</script>

<template>
  <div class="bg-neutral-100 fixed inset-0 -z-50"></div>
  <notifications/>
  <RouterView/>
</template>
