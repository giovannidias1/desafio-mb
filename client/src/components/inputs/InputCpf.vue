<template>
  <div>
    <label for="cpf">CPF:</label>
    <input
      id="cpf"
      type="text"
      :value="modelValue"
      @keypress="allowOnlyNumbers"
      @input="onInput"
      :class="{ invalid: !isValid && modelValue?.length > 0 }"
      maxlength="14"
      placeholder="000.000.000-00"
    />
    <p v-if="showError" class="error-msg">CPF inválido</p>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { isValidCPF, allowOnlyNumbers } from "../../../../shared/validations";

const props = defineProps({
  modelValue: String,
  required: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue", "valid"]);

const onInput = (e) => {
  let raw = e.target.value.replace(/\D/g, "").slice(0, 14);

  const masked = raw
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");

  emit("update:modelValue", masked);
};

const cleaned = computed(() => props.modelValue?.replace(/\D/g, "") || "");

const isValid = computed(() => {
  if (!props.required && cleaned.value.length === 0) return true;
  return isValidCPF(cleaned.value);
});

const showError = computed(() => {
  return props.required
    ? cleaned.value.length > 0 && !isValid.value
    : cleaned.value.length > 0 && !isValid.value;
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
