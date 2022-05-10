<script setup>
import { ref, computed, defineProps, watch } from "vue";

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
  base: {
    type: Number,
    required: true,
    default: 10,
  },
  animate: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["animationEnd"]);

const digits = computed(() => props.end.toString(props.base).length);

console.log({ digits: digits.value });

const end = ref(props.end);
const step = ref(props.step);
const count = ref(props.start);

watch(
  [() => props.start, () => props.end, () => props.step],
  ([startProp, endProp, stepProp]) => {
    count.value = startProp;
    end.value = endProp;
    step.value = stepProp;
  }
);

function increment() {
  if (count.value + step.value < end.value) {
    count.value += step.value;
  } else {
    emit("animationEnd");
  }
}

function getDigit(digit, number) {
  const strNumber = number.toString(props.base).padStart(digits.value, "0");

  console.log({ strNumber }, props.base, { number });

  return parseInt(strNumber[digit]);
}

function animationEnd() {}
</script>

<template>
  <div class="wrapper">
    <FlipCard
      v-for="n in digits"
      :key="n"
      :animate="animate"
      :current="getDigit(n - 1, count)"
      :next="getDigit(n - 1, count + step)"
      @animation-end="n === digits && increment()"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: 16px;
}
</style>
