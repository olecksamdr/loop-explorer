<script setup>
import { computed, reactive, ref } from "vue";

import FlipCard from "./components/FlipCard.vue";
import FlipCounter from "./components/FlipCounter.vue";
import Code from "./components/Code.vue";
import PlayButton from "./components/PlayButton.vue";

const animateJ = ref(false);
const animateI = ref(false);

const variables = reactive({
  i: 2,
  j: 3,
});

// if value of reset changes than componenet will be reseted :)
const reset = ref(false);

function resetCounters() {
  reset.value = !reset.value;
}

const code = `
for i in range({{i:${variables.i}}}):
  for j in range({{j:${variables.j}}}):
    print(i, j)
`;

function onInput({ target }) {
  const { name, value } = target;

  variables[name] = value === "" ? 0 : parseInt(value, 10);
  resetCounters();
}

function startStopAnimation() {
  animateJ.value = !animateJ.value;
  resetCounters();
}

function jCycleEnd(value) {
  if (value === variables.j - 1) {
    animateI.value = true;
  }
}
</script>

<template>
  <main>
    <section class="code-section">
      <Code :code="code" @input="onInput" />
    </section>
    <section class="center-section">
      <PlayButton :playing="animateJ" @click="startStopAnimation" />
    </section>
    <section class="counter-section">
      <FlipCounter
        label="i"
        :start="0"
        :step="1"
        :animate="animateI"
        :end="variables.i"
        :reset="reset"
        @step-end="animateI = false"
      />
      <FlipCounter
        label="j"
        :start="0"
        :step="1"
        :animate="animateJ"
        :end="variables.j"
        :repeat="Math.max(variables.i, 1)"
        :reset="reset"
        @cycle-end="jCycleEnd"
        @animation-end="animateJ = false"
      />
    </section>
  </main>
</template>

<style>
@import "./assets/base.css";

.counter-section,
.code-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.center-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.code-section {
  /* border-right: 1px solid var(--border-color); */
  font-size: 2rem;
  padding: 16px;
}

main {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
  /* align-items: center; */
}

@keyframes attention {
  to {
    box-shadow: 0 0 0 2px var(--accent);
  }
}

.center-section::before,
.center-section::after {
  content: "";
  width: 1px;
  background-color: var(--border-color);
  flex-grow: 1;
}
</style>
