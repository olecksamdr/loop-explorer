<script setup>
import { ref } from "vue";

import IconPause from "./icons/Pause.vue";
import IconPlay from "./icons/Play.vue";

defineProps({
  playing: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <button class="play-button" :class="{ playing }">
    <IconPause v-if="playing" />
    <IconPlay v-else />
  </button>
</template>

<style scoped>
.play-button {
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: var(--green);
  padding: 16px;
  border-radius: 8px;
  box-shadow: inset 0 0 0 2px;
  border-radius: 50%;
  background-color: var(--light-green);
  transition: color 0.1s, box-shadow 0.1s;
}

.play-button:active,
.play-button:focus-visible {
  box-shadow: inset 0 0 0 5px;
}

.play-button:focus {
  outline: none;
}

.playing {
  background-color: var(--bg);
  color: var(--gray);
  border-color: var(--gray);
}
</style>
