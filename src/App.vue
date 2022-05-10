<script setup>
import { computed, reactive, ref } from "vue";

import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import FlipCard from "./components/FlipCard.vue";
import FlipCounter from "./components/FlipCounter.vue";
import Code from "./components/Code.vue";

const animate = ref(false);
const variables = reactive({
  i: 2,
  j: 3,
});

const end = computed(() => {
  const strI = variables.i > 1 ? String(variables.i - 1) : 0;
  const strJ = variables.j > 1 ? String(variables.j - 1) : 0;

  console.log("parse", parseInt(strI + strJ, variables.j));
  return parseInt(strI + strJ, variables.j);
});

const base = computed(() => (variables.j > 1 ? variables.j : 10));

const code = `
for i in range({{i:${variables.i}}}):
  for j in range({{j:${variables.j}}}):
    print(i, j)
`;

function onInput({ target }) {
  const { name, value } = target;

  console.log({ value });

  variables[name] = value === "" ? 0 : value;
}

function startAnimation() {
  animate.value = true;
}
</script>

<template>
  <main>
    <section class="code-section">
      <Code :code="code" @input="onInput" />
    </section>
    <section class="counter-section">
      <FlipCounter
        :start="0"
        :end="end"
        :step="1"
        :base="base"
        :animate="animate"
        @animation-end="animate = false"
      />
    </section>
    <button @click="startAnimation">play</button>
  </main>
</template>

<style>
@import "./assets/base.css";

#app {
  /* max-width: 1280px; */
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

.counter-section,
.code-section {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.code-section {
  border-right: 1px solid var(--border-color);
  font-size: 2rem;
  padding: 16px;
}

main {
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

@keyframes attention {
  to {
    box-shadow: 0 0 0 2px var(--accent);
  }
}
</style>
