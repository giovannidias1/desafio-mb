<template>
  <div>
    <label for="phone">Telefone:</label>
    <input
      id="phone"
      type="text"
      :value="modelValue"
      @keypress="allowOnlyNumbers"
      @input="onInput"
      :class="{ invalid: !isValid && modelValue?.length > 0 }"
      maxlength="15"
      placeholder="(12) 91234-4567"
    />
    <p v-if="showError" class="error-msg">Telefone inválido</p>
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
  const raw = e.target.value.replace(/\D/g, "");

  let masked = raw;

  if (raw.length <= 10) {
    masked = raw
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    masked = raw
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  emit("update:modelValue", masked);
};

const cleaned = computed(() => props.modelValue?.replace(/\D/g, "") || "");

const isValid = computed(() => {
  const len = cleaned.value.length;

  if (!props.required && len === 0) return true;
  return len === 10 || len === 11;
});

const showError = computed(() => {
  return cleaned.value.length > 0 && !isValid.value;
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
