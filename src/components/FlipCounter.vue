<script setup>
import { ref, defineProps, watch } from "vue";

import FlipCard from "./FlipCard.vue";

const props = defineProps({
  start: {
    type: Number,
    required: true,
  },
  end: {
    type: Number,
    required: true,
  },
  step: {
    type: Number,
    required: true,
    default: 1,
  },
  repeat: {
    type: Number,
    default: 1,
  },
  animate: {
    type: Boolean,
    required: true,
  },
  // reset state when value changes
  reset: {
    type: Boolean,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["stepEnd", "cycleEnd", "animationEnd"]);

const end = ref(props.end);
const step = ref(props.step);
const current = ref(props.start);
const next = ref(props.start + step.value);
const repeated = ref(0);

watch(
  // TODO: Check watch source code
  [
    () => props.start,
    () => props.end,
    () => props.step,
    () => props.repeat,
    () => props.reset,
  ],
  ([startProp, endProp, stepProp]) => {
    end.value = endProp;
    step.value = stepProp;
    current.value = startProp;
    next.value = startProp + step.value;
    repeated.value = 0;
  }
);

function increment() {
  emit("stepEnd", next.value);

  if (next.value + step.value < end.value) {
    current.value = next.value;
    next.value += step.value;
  } else {
    repeated.value += 1;

    if (repeated.value < props.repeat) {
      emit("cycleEnd", next.value);

      current.value = next.value;
      next.value = props.start;
    } else {
      console.log(repeated.value, props.animate);
      emit("animationEnd", next.value);
    }
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="label">{{ label }}</div>
    <FlipCard
      :animate="animate"
      :current="current"
      :next="next"
      :reset="reset"
      @animation-end="increment"
    />
  </div>
</template>

<style scoped>
.wrapper {
  text-align: center;
}

.label {
  font-size: 3rem;
}
</style>
