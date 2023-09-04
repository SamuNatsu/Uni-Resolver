<script lang="ts" setup>
import { notify } from '@kyvg/vue3-notification';
import { useLocalStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

/* Injects */
const { t } = useI18n();
const dataSrc = useLocalStorage<DataSource[]>('data_source', []);

/* Functions */
function fetchData(): void {
  if (dataSrc.value.length === 0) {
    notify({
      title: t('data_process.error._'),
      text: t('data_process.error.source_empty'),
      type: 'error'
    });
    return;
  }
}
</script>

<template>
  <div class="bg-white flex flex-col gap-4 p-4 rounded-md w-1/3">
    <h2 class="font-bold font-sans text-2xl">{{ $t('data_process.title') }}</h2>
    <div class="flex flex-col gap-4">
      <button
        @click="fetchData"
        class="bg-green-100 font-bold p-4 rounded-md hover:bg-green-200"
        key="add_source">
        {{ $t('data_process.fetch_data') }}
      </button>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  data_process:
    title: "Data Process"
    fetch_data: "Fetch Data"
    error:
      _: "Error"
      source_empty: "Data source CANNOT be empty"
zh:
  data_process:
    title: "数据处理"
    fetch_data: "拉取数据"
    error:
      _: "错误"
      source_empty: "数据源不能为空"
</i18n>
