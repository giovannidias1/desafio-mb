<template>
  <div class="step">
    <h1 class="step-title">Pessoa Fisíca</h1>

    <div class="form-group">
      <label for="name">Nome: </label>
      <input
        id="name"
        type="text"
        v-model="form.name"
        required
        :class="{ invalid: nameTouched && !form.name }"
        @blur="nameTouched = true"
      />
      <p v-if="nameTouched && !form.name" class="error-msg">
        Campo obrigatório
      </p>
    </div>

    <InputCpf v-model="form.cpf" @valid="cpfIsValid = $event" />

    <div class="form-group">
      <label for="birthdate">Data de aniversário:</label>
      <input
        id="birthdate"
        type="date"
        v-model="form.birthdate"
        required
        :class="{ invalid: birthdateTouched && !form.birthdate }"
        @blur="birthdateTouched = true"
      />
      <p v-if="birthdateTouched && !form.birthdate" class="error-msg">
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
import InputCpf from "../inputs/InputCpf.vue";
import InputTel from "../inputs/InputTel.vue";

const props = defineProps({
  form: Object,
});
const emit = defineEmits(["next", "back"]);

const nameTouched = ref(false);
const birthdateTouched = ref(false);
const cpfIsValid = ref(false);
const phoneIsValid = ref(false);

const canContinue = computed(() => {
  return (
    props.form.name?.length > 0 &&
    props.form.birthdate &&
    cpfIsValid.value &&
    phoneIsValid.value
  );
});

const validateAndNext = () => {
  if (!canContinue.value) return;
  emit("next");
};
</script>

<style scoped></style>
