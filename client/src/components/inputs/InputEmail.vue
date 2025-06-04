<template>
  <div>
    <label for="email">Email:</label>
    <input
      id="email"
      type="text"
      :value="modelValue"
      :class="{ invalid: !isValid && modelValue?.length > 0 }"
      @input="onInput"
      placeholder="exemplo@ex.com"
    />
    <p v-if="showError" class="error-msg">Email inválido</p>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { isValidEmail } from "../../../../shared/validations";

const props = defineProps({
  modelValue: String,
  required: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "valid"]);

const onInput = (e) => {
  emit("update:modelValue", e.target.value);
};

const isValid = computed(() => {
  const value = props.modelValue || "";
  if (!props.required && value.length === 0) return true;
  return isValidEmail(value);
});

const showError = computed(() => {
  return props.modelValue?.length > 0 && !isValid.value;
});

watch(
  () => props.modelValue,
  () => {
    emit("valid", isValid.value);
  },
  { immediate: true }
);
</script>

<style scoped></style>
