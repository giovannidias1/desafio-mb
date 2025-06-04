<template>
  <div>
    <label for="cnpj">CNPJ:</label>
    <input
      id="cnpj"
      type="text"
      :value="modelValue"
      @keypress="allowOnlyNumbers"
      @input="onInput"
      :class="{ invalid: showError }"
      maxlength="18"
      placeholder="00.000.000/0000-00"
    />
    <p v-if="showError" class="error-msg">CNPJ inválido</p>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import { isValidCNPJ, allowOnlyNumbers } from "../../../../shared/validations";

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
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");

  emit("update:modelValue", masked);
};

const cleaned = computed(() =>
  String(props.modelValue ?? "").replace(/\D/g, "")
);

const isValid = computed(() => {
  if (!props.required && cleaned.value.length === 0) return true;
  return isValidCNPJ(cleaned.value);
});

const showError = computed(() => {
  return props.required
    ? cleaned.value.length > 0 && !isValid.value
    : cleaned.value.length > 0 && !isValid.value;
});

watch(
  () => isValid.value,
  (val) => emit("valid", val),
  { immediate: true }
);
</script>

<style scoped></style>
