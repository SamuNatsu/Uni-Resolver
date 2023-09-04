<script lang="ts" setup>
import { notify } from '@kyvg/vue3-notification';
import { useLocalStorage } from '@vueuse/core';
import { v4 } from 'uuid';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

/* Injects */
const { t } = useI18n();
const dataSrc = useLocalStorage<DataSource[]>('data_source', []);

/* Computed */
const canUp = computed((): ((index: number) => boolean) => {
  return (index: number): boolean => index > 0;
});
const canDown = computed((): ((index: number) => boolean) => {
  return (index: number): boolean => index + 1 < dataSrc.value.length;
});

/* Functions */
function addSource(): void {
  dataSrc.value.push({
    uuid: v4(),
    label: t('data_source.new_source'),
    api: '',
    contestIds: ''
  });
}
function moveUp(index: number): void {
  [dataSrc.value[index - 1], dataSrc.value[index]] = [
    dataSrc.value[index],
    dataSrc.value[index - 1]
  ];
}
function moveDown(index: number): void {
  [dataSrc.value[index], dataSrc.value[index + 1]] = [
    dataSrc.value[index + 1],
    dataSrc.value[index]
  ];
}
function testSource(index: number): void {
  if (
    !/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
      dataSrc.value[index].api
    )
  ) {
    notify({
      title: t('data_source.error._'),
      text: t('data_source.error.invalid_api'),
      type: 'error'
    });
    return;
  }
  if (!/^\d+(,\d+)*$/.test(dataSrc.value[index].contestIds)) {
    notify({
      title: t('data_source.error._'),
      text: t('data_source.error.invalid_contest_ids'),
      type: 'error'
    });
    return;
  }

  /* TODO: Fetch data test */

  notify({
    title: t('data_source.success._'),
    text: t('data_source.success.valid', {...dataSrc.value[index]}),
    type: 'success'
  });
}
function delSource(index: number): void {
  const tmp: DataSource[] = dataSrc.value.slice(0, index);
  tmp.push(...dataSrc.value.slice(index + 1));

  dataSrc.value = tmp;
}
</script>

<template>
  <div class="bg-white flex flex-col gap-4 p-4 rounded-md w-1/3">
    <h2 class="font-bold font-sans text-2xl">{{ $t('data_source.title') }}</h2>
    <div class="flex flex-col gap-4">
      <TransitionGroup>
        <div
          v-for="(i, idx) in dataSrc"
          class="bg-blue-100 flex flex-col gap-4 p-4 rounded-md"
          :key="i.uuid">
          <input
            v-model="i.label"
            class="bg-transparent border-b-2 border-b-black font-bold outline-none p-1 w-full"
            :placeholder="$t('data_source.label')"
            type="text"/>
          <input
            v-model="i.api"
            class="outline-none p-1 rounded-md w-full"
            placeholder="API URL"
            type="text"/>
          <input
            v-model="i.contestIds"
            class="outline-none p-1 rounded-md w-full"
            :placeholder="$t('data_source.contest_ids')"
            type="text"/>
          <div class="flex items-center justify-center gap-4">
            <button
              v-if="canUp(idx)"
              @click="moveUp(idx)"
              class="bg-green-500 font-bold px-4 py-1 rounded-md text-white hover:bg-green-600">
              {{ $t('data_source.up') }}
            </button>
            <button
              v-if="canDown(idx)"
              @click="moveDown(idx)"
              class="bg-green-500 font-bold px-4 py-1 rounded-md text-white hover:bg-green-600">
              {{ $t('data_source.down') }}
            </button>
            <button
              @click="testSource(idx)"
              class="bg-cyan-500 font-bold px-4 py-1 rounded-md text-white hover:bg-cyan-600">
              {{ $t('data_source.test_source') }}
            </button>
            <button
              @click="delSource(idx)"
              class="bg-red-500 font-bold px-4 py-1 rounded-md text-white hover:bg-red-600">
              {{ $t('data_source.del_source') }}
            </button>
          </div>
        </div>
        <button
          @click="addSource"
          class="bg-green-100 font-bold p-4 rounded-md hover:bg-green-200"
          key="add_source">
          {{ $t('data_source.add_source') }}
        </button>
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.v-move,
.v-enter-active,
.v-leave-active {
  transition: all .3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.v-leave-active {
  position: absolute;
  width: calc(33.333333% - 2rem);
}
</style>

<i18n lang="yaml">
en:
  data_source:
    title: "Data Sources"
    add_source: "Add Source"
    label: "Label"
    contest_ids: "Contest IDs (1001,1002,...)"
    up: "Up"
    down: "Down"
    test_source: "Test Source"
    del_source: "Delete Source"
    new_source: "New Data Source"
    success:
      _: "Success"
      valid: "Data source \"{label}\" is available"
    error:
      _: "Error"
      invalid_api: "API URL invalid"
      invalid_contest_ids: "Contest ID list invalid"
zh:
  data_source:
    title: "数据源"
    add_source: "添加源"
    label: "标签"
    contest_ids: "比赛 ID 列表 (1001,1002,...)"
    up: "上移"
    down: "下移"
    test_source: "测试源"
    del_source: "删除源"
    new_source: "新数据源"
    success:
      _: "成功"
      valid: "数据源 \"{label}\" 可用"
    error:
      _: "错误"
      invalid_api: "API 链接非法"
      invalid_contest_ids: "比赛 ID 列表非法"
</i18n>
