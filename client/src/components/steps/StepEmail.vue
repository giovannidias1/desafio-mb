<template>
  <div class="step">
    <InputEmail v-model="form.email" @valid="emailIsValid = $event" />

    <div class="radio-group">
      <label>
        <input type="radio" value="PF" v-model="form.type" />
        Pessoa Física (PF)
      </label>
      <label>
        <input type="radio" value="PJ" v-model="form.type" />
        Pessoa Jurídica (PJ)
      </label>
    </div>

    <p v-if="typeTouched && !form.type" class="error-msg">
      Selecione um tipo de cadastro
    </p>

    <div class="actions">
      <button
        class="btn btn-primary"
        :disabled="!emailIsValid || !form.type"
        :class="{ disabled: !emailIsValid || !form.type }"
        @click="validateAndNext"
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputEmail from "../inputs/InputEmail.vue";

const props = defineProps({
  form: Object,
});
const emit = defineEmits(["next"]);

const typeTouched = ref(false);
const emailIsValid = ref(false);

const validateAndNext = () => {
  typeTouched.value = true;
  if (!emailIsValid.value || !props.form.type) return;
  emit("next");
};
</script>

<style scoped>
.step {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.actions {
  margin-top: 16px;
}
</style>
