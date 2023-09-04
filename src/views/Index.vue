<script lang="ts" setup>
import { useTitle } from '@vueuse/core';
import { version } from '@/../package.json';
import DataSource from '@/components/DataSource.vue';
import Language from '@/components/Language.vue';
import DataProcess from '@/components/DataProcess.vue';

/* Inject */
useTitle('Uni Resolver');
</script>

<template>
  <div class="flex flex-col gap-8 items-center justify-center py-12 w-full">
    <header class="flex items-center justify-center gap-4 mb-8 select-none">
      <img class="h-20 w-20" draggable="false" src="/imgs/medal.svg"/>
      <h1 class="font-bold font-sans relative">
        <span class="text-4xl">Uni Resolver</span>
        <span class="absolute -bottom-4 right-1">{{ version }}</span>
      </h1>
    </header>
    <Language/>
    <DataSource/>
    <DataProcess/>
  </div>
</template>
