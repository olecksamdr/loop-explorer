<script setup>
import { reactive, watch } from "vue";

import { TOKEN_TYPES, parse } from "../utils/parser";

const highlightTypes = [
  TOKEN_TYPES.KEYWORD,
  TOKEN_TYPES.FUNCTION,
  TOKEN_TYPES.BRACE,
];

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});

defineEmits(["input"]);

const tokens = parse(props.code);
</script>

<template>
  <code>
    <template v-for="({ type, value, name }, idx) in tokens" :key="idx">
      <input
        v-if="type === TOKEN_TYPES.INPUT"
        @input="$emit('input', $event)"
        class="code-input"
        :value="value"
        :name="name"
        type="text"
      />
      <span v-else-if="highlightTypes.includes(type)" :class="type">{{
        value
      }}</span>
      <template v-else>{{ value }}</template>
    </template>
  </code>
</template>

<style scoped>
code {
  white-space: pre;
}
.code-input {
  font-family: inherit;
  font-size: inherit;
  width: 3ch;
  border: none;
  border: 1px solid var(--border-color);
  color: var(--orange2);
  text-align: center;
  border-radius: 8px;
}

.code-input:focus {
  outline-color: var(--accent);
}

.keyword {
  color: var(--purple);
}

.function {
  color: var(--cyan);
}

.brace {
  color: var(--accent);
}
</style>
