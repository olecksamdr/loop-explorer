<script setup>
import { computed, watch, ref } from "vue";
// TODO: use slot for current
const props = defineProps({
  current: {
    type: Number,
    required: true,
  },
  next: {
    type: Number,
    required: true,
  },
  // TODO: use durration and delay
  durration: {
    type: Number,
    default: 1000,
  },
  delay: {
    type: Number,
    default: 0,
  },
  animate: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["animationEnd"]);

const topCurrent = ref(props.current);
const topNext = ref(props.next);

const bottomCurrent = ref(props.current);
const bottomNext = ref(props.next);

watch(
  () => props.current,
  (current) => {
    // console.log("FlipCard", props.current, props.next);
    topCurrent.value = current;
    bottomCurrent.value = current;
  }
);

watch(
  () => props.next,
  (next) => {
    topNext.value = next;
    bottomNext.value = next;
  }
);

// animation of top part ended and topCurrent part is back to starting position
function topAnimationEnd() {
  topCurrent.value = topNext.value;
  console.log(topCurrent.value);
}

// animation of bottom part ended and bottomFront part is back to starting position
async function bottomAnimationEnd() {
  bottomCurrent.value = bottomNext.value;
  emit("animationEnd");
}
</script>

<template>
  <div class="card">
    <div class="card__top-next">{{ topNext }}</div>
    <div
      :key="next"
      :class="{ animate }"
      class="card__top-current"
      @animationend="topAnimationEnd"
    >
      {{ topCurrent }}
    </div>
    <div class="card__bottom-current">{{ bottomCurrent }}</div>
    <div
      :key="next"
      :class="{ animate }"
      class="card__bottom-next"
      @animationend="bottomAnimationEnd"
    >
      {{ bottomNext }}
    </div>
  </div>
</template>

<style scoped>
/* TODO:
    1. leading-trim. Text vertical alignment
*/

.card {
  /* colors */
  /* --color: #616161; */
  /* --border-color: #d6d6d6; */
  --card-bg: white;

  /* metriics */
  --font-size: 10rem /* 4.35rem */;
  --border-size: 0.125rem;
  --vertical-padding: 1.125rem;
  --horizontal-padding: 0.875rem;
  --perspective: calc(var(--font-size) * 2);

  /* animation */
  --animation-duration: 0.5s;
  --half-of-duration: calc(var(--animation-duration) / 2);

  flex-shrink: 0;
  box-sizing: content-box;
  display: inline-grid;
  grid-template-areas:
    "top"
    "bottom";
  font-size: var(--font-size);
  line-height: 1;
  height: calc(
    var(--font-size) + 2 * var(--vertical-padding) + 3 * var(--border-size)
  );
  color: var(--text-color);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

/* .reference {
  padding: var(--vertical-padding) var(--horizontal-padding);
  border-radius: 8px;
  border: 2px solid var(--border-color);
} */

.card__top-next,
.card__bottom-current,
.card__bottom-next,
.card__top-current {
  box-sizing: border-box;
  max-height: 100%;
  display: flex;
  overflow: hidden;
  background-color: var(--card-bg);
  border: var(--border-size) solid var(--border-color);
}

.card__top-next,
.card__top-current {
  padding: var(--vertical-padding) var(--horizontal-padding) 0;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom: none;

  z-index: 1;
  grid-area: top;
  background: var(--bg);
  /* background: linear-gradient(to top, #fff 0%, #f6f6f6 30%); */
}

.card__bottom-current,
.card__bottom-next {
  background: #fff;
  /* background: linear-gradient(to top, #f6f6f6 1%, #fff 6%); */
}

/* perspective */
.card__top-current {
  transform-origin: center bottom;
}

.card__top-current.animate {
  animation: flip-top-part var(--half-of-duration) ease-in;
}

.card__bottom-next {
  transform-origin: center top;
  transform: perspective(var(--perspective)) rotateX(90deg);
}

.card__bottom-next.animate {
  animation: flip-bottom-part var(--half-of-duration) ease-out
    var(--half-of-duration);
}

.card__bottom-current,
.card__bottom-next {
  padding: 0 var(--horizontal-padding) var(--vertical-padding);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-top: var(--border-size) solid var(--border-color); /* #525252; */
  align-items: flex-end;
  grid-area: bottom;
}

@keyframes flip-top-part {
  to {
    transform: perspective(var(--perspective)) rotateX(-90deg);
  }
}

@keyframes flip-bottom-part {
  to {
    transform: perspective(var(--perspective)) rotateX(0deg);
  }
}
</style>
