<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  poster: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="card h-100" style="width: 18rem">
    <img :src="props.poster" class="card-img-top" :alt="props.title" />
    <div class="card-body">
      <h5 class="card-title">{{ props.title }}</h5>
      <p class="card-text">
        {{ props.text }}
      </p>
      <p class="card-text">
        <small class="text-muted"> Release Year: {{ props.year }}</small>
      </p>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #2c3d4e;
  color: #fff;
  border: none;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.card:hover {
  transform: scale(1.02);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
}

.card img {
  border-radius: 8px 8px 0 0;
}

.card-title {
  color: #42b883;
}

.card-text {
  color: #fff;
}

.text-muted {
  color: #aaa !important;
}

.card-body {
  padding: 20px;
}
</style>
