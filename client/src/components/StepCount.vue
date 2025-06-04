<template>
  <div class="stepCount">
    Etapa <strong>{{ currentStep }}</strong> de {{ totalSteps }}
  </div>
</template>
<script setup>
defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  totalSteps: {
    type: Number,
    required: true,
  },
});
</script>
<style>
.stepCount {
  color: #000;
}
.stepCount strong {
  color: #ff9900;
}
</style>
