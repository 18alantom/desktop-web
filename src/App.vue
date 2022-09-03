<template>
  <div class="container">
    <h1 class="title">COUNTERS</h1>
    <div class="counter-container">
      <div class="counters">
        <div v-for="i in counterManager.list" class="counter">
          <p class="name">
            {{ i.name }}
          </p>
          <p class="value">{{ i.value }}</p>
          <button class="inc" @click="counterManager.increment(i.name)">
            inc
          </button>
          <button class="del" @click="counterManager.delete(i.name)">
            del
          </button>
        </div>
        <p v-if="!counterManager.counters.value.size" class="empty">
          no counters to be displayed
        </p>
      </div>
      <hr />
      <div class="add">
        <input
          type="text"
          placeholder="enter counter name"
          v-model="newName"
          @keypress.enter="counterManager.add(newName)"
        />
        <button @click="counterManager.add(newName)">add</button>
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
  mounted() {
    this.counterManager.load();
  },
});
</script>
