<template>
  <div
    class="flex justify-center items-center h-screen v-screen bg-gray-25 text-gray-900"
    style="-webkit-app-region: drag"
  >
    <div
      class="bg-white w-500 h-500 rounded-lg border flex flex-col text-sm overflow-auto"
      style="-webkit-app-region: no-drag"
    >
      <!-- Title -->
      <h1
        class="font-bold text-gray-900 w-full border-b px-4 text-xl sticky top-0 bg-white h-16 shrink-0"
        style="line-height: 4rem"
      >
        Counters
      </h1>

      <!-- Header Row -->
      <div
        class="flex p-4 border-b gap-4 text-gray-600 bg-white h-16 items-center shrink-0 sticky"
        style="top: 4rem"
      >
        <p class="w-6 shrink-0">#</p>
        <p class="w-40 shrink-0">Name</p>
        <p class="ml-auto text-right shrink-0">Value</p>
        <p class="text-center border-l pl-4" style="width: calc(6rem + 1px)">
          Controls
        </p>
      </div>

      <!-- Counters -->
      <div
        v-for="(counter, i) in counterManager.list"
        class="flex p-4 gap-4 items-center h-16 shrink-0"
        :class="
          i === counterManager.counters.value.size - 1 ? 'border-0' : 'border-b'
        "
      >
        <p class="w-6 shrink-0">{{ i + 1 }}.</p>
        <p class="w-48 shrink-0">
          {{ counter.name }}
        </p>
        <p class="ml-auto text-right">{{ counter.value }}</p>
        <div class="flex border-l pl-4 gap-0">
          <button
            class="pill-btn rounded-l-md py-0.5"
            @click="counterManager.increment(counter.name)"
          >
            inc
          </button>
          <button
            class="pill-btn border-l rounded-r-md"
            @click="counterManager.delete(counter.name)"
          >
            del
          </button>
        </div>
      </div>

      <!-- Empty Message -->
      <p
        v-if="!counterManager.counters.value.size"
        class="px-4 text-gray-600 border-b h-16"
        style="line-height: 4rem"
      >
        no counters to be displayed
      </p>

      <!-- Controls -->
      <div
        class="mt-auto p-4 border-t justify-between flex sticky bottom-0 bg-white"
      >
        <input
          class="bg-gray-50 px-4 py-1 w-48 focus:bg-gray-100 rounded border outline-none text-sm"
          type="text"
          placeholder="Enter counter name"
          v-model="newName"
          @keypress.enter="counterManager.add(newName)"
        />
        <button
          class="pill-btn-primary rounded-md"
          @click="counterManager.add(newName)"
        >
          add
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return { newName: '' };
  },
  async mounted() {
    await this.counterManager.load();
  },
});
</script>
