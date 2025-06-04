<template>
  <div class="step">
    <div class="form-group">
      <label for="razaoSocial">Razão social: </label>
      <input id="razaoSocial" type="text" v-model="form.razaoSocial" required />
    </div>

    <InputCnpj v-model="form.cnpj" @valid="cnpjIsValid = $event" />

    <div class="form-group">
      <label for="openingDate">Data de abertura:</label>
      <input id="openingDate" type="date" v-model="form.openingDate" required />
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
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
</style>
