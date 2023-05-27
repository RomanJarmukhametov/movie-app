<script setup>
// Import Unique ID generator

const props = defineProps({
  // Label text for the form-select element
  label: {
    type: String,
    default: ''
  },
  // The selected value of the form-select element
  modelValue: {
    type: [String, Number],
    default: ''
  },
  // Array of options for the form-select element
  options: {
    type: Array,
    required: true
  },

  error: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <!-- Create a form-select element with the provided modelValue -->
  <select
    class="form-select custom-select border-0"
    :value="props.modelValue"
    @change="($event) => $emit('update:modelValue', $event.target.value)"
  >
    <option disabled value="">{{ label }}</option>
    <!-- Loop through the options array and create an option element for each -->
    <option v-for="option in props.options" :value="option" :key="option">
      {{ option }}
    </option>
  </select>

  <div
    v-if="props.error"
    class="alert alert-danger"
    role="alert"
    :id="`${uuid}-error`"
    aria-live="assertive"
  >
    {{ props.error }}
  </div>
</template>

<style scoped>
.custom-select {
  color: #fff;
  background-color: #496583;
  font-size: 1.25rem;
  padding: 1rem;
  border-radius: 0.5rem;
}

</style>
