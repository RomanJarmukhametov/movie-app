<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  grade: {
    type: Number,
    required: true
  },
  maxStars: {
    type: Number,
    default: 5
  },
  hasCounter: {
    type: Boolean,
    default: true
  }
})

let stars = ref(props.grade)

const rate = (star) => {
  if (typeof star === 'number' && star <= props.maxStars && star >= 0) {
    stars.value = stars.value === star ? star - 1 : star
  }
}
//Define emit
const emit = defineEmits(['update:grade'])

//Emit an event whenever a rating is selected
watch(stars, (newVal) => {
  emit('update:grade', newVal)
})

</script>

<template>
  <div class="rating">
    <ul class="list">
      <li
        :key="star"
        v-for="star in maxStars"
        :class="{ active: star <= stars }"
        @click="rate(star)"
        class="star"
      >
        <i class="bi" :class="star <= stars ? 'bi-star-fill' : 'bi-star'"></i>
      </li>
    </ul>
    <span v-if="hasCounter">{{ stars }} of {{ maxStars }}</span>
  </div>
</template>
<style scoped>
.rating {
  color: #a7a8a8;
}

.list {
  margin: 0 0 5px 0;
  padding: 0;
  list-style-type: none;
}

.list:hover .star {
  color: #f3d23e;
}

.star {
  display: inline-block;
  cursor: pointer;
}

.star:hover ~ .star:not(.active) {
  color: inherit;
}

.active {
  color: #f3d23e;
}
</style>
