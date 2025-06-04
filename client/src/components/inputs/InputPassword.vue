<template>
  <div>
    <label for="password">Senha:</label>
    <input
      id="password"
      :type="showPassord ? 'text' : 'password'"
      :value="modelValue"
      @input="onInput"
      :class="{ invalid: showError }"
      placeholder="Digite uma senha forte"
    />

    <div class="validation-msg" v-html="feedbackHtml"></div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  modelValue: String,
  required: {
    type: Boolean,
    default: true,
  },
  showPassord: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "valid"]);

const onInput = (e) => {
  emit("update:modelValue", e.target.value);
};

const rules = computed(() => {
  const value = props.modelValue || "";
  return {
    minLength: value.length >= 8,
    hasNumber: /\d/.test(value),
    hasUpper: /[A-Z]/.test(value),
    hasLower: /[a-z]/.test(value),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
  };
});

const isValid = computed(() => {
  const r = rules.value;
  return r.minLength && r.hasNumber && r.hasUpper && r.hasLower && r.hasSpecial;
});

const showError = computed(() => {
  return props.modelValue?.length > 0 && !isValid.value;
});

const feedbackHtml = computed(() => {
  const r = rules.value;
  const val = props.modelValue || "";

  if (val.length === 0) return "";

  if (isValid.value) {
    return `<span class="success">Senha segura</span>`;
  }

  let html = "<ul>";
  if (!r.minLength) {
    html += `<li>Mínimo de 8 caracteres</li>`;
  }
  if (!r.hasNumber) {
    html += `<li>Pelo menos um número</li>`;
  }
  if (!r.hasUpper) {
    html += `<li>Pelo menos uma letra maiúscula</li>`;
  }
  if (!r.hasLower) {
    html += `<li>Pelo menos uma letra minúscula</li>`;
  }
  if (!r.hasSpecial) {
    html += `<li>Pelo menos um caractere especial (!@#...)</li>`;
  }
  html += "</ul>";

  return `${html}`;
});

watch(
  () => props.modelValue,
  () => {
    emit("valid", isValid.value);
  },
  { immediate: true }
);
</script>

<style></style>
