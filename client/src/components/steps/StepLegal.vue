<template>
  <div class="step">
    <h1 class="step-title">Pessoa Jurídica</h1>

    <div class="form-group">
      <label for="razaoSocial">Razão social: </label>
      <input
        id="razaoSocial"
        type="text"
        v-model="form.razaoSocial"
        :class="{ invalid: razaoTouched && !form.razaoSocial }"
        @blur="razaoTouched = true"
        required
      />
      <p v-if="razaoTouched && !form.razaoSocial" class="error-msg">
        Campo obrigatório
      </p>
    </div>

    <InputCnpj v-model="form.cnpj" @valid="cnpjIsValid = $event" />

    <div class="form-group">
      <label for="openingDate">Data de abertura:</label>
      <input
        id="openingDate"
        type="date"
        v-model="form.openingDate"
        required
        :class="{ invalid: openingDateTouched && !form.openingDate }"
        @blur="openingDateTouched = true"
      />
      <p v-if="openingDateTouched && !form.openingDate" class="error-msg">
        Campo obrigatório
      </p>
    </div>

    <InputTel v-model="form.phone" @valid="phoneIsValid = $event" />

    <div class="actions">
      <button class="btn btn-secondary" @click="emit('back')">Voltar</button>
      <button
        class="btn btn-primary"
        :disabled="!canContinue"
        :class="{ disabled: !canContinue }"
        @click="validateAndNext"
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import InputCnpj from "../inputs/InputCnpj.vue";
import InputTel from "../inputs/InputTel.vue";

const props = defineProps({
  form: Object,
});
const emit = defineEmits(["next", "back"]);

const razaoTouched = ref(false);
const openingDateTouched = ref(false);
const cnpjIsValid = ref(false);
const phoneIsValid = ref(false);

const canContinue = computed(() => {
  return (
    props.form.razaoSocial?.length > 0 &&
    props.form.openingDate &&
    cnpjIsValid.value &&
    phoneIsValid.value
  );
});

const validateAndNext = () => {
  if (!canContinue.value) return;
  emit("next");
};
</script>

<style scoped></style>
