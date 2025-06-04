<template>
  <div class="step">
    <InputEmail v-model="form.email" @valid="emailIsValid = $event" />

    <div class="step" v-if="form.type === 'PJ'">
      <div class="form-group">
        <label for="razaoSocial">Razão social: </label>
        <input
          id="razaoSocial"
          type="text"
          v-model="form.razaoSocial"
          required
        />
      </div>
      <InputCnpj v-model="form.cnpj" @valid="cpfIsValid = $event" />
      <div class="form-group">
        <label for="openingDate">Data de abertura:</label>
        <input
          id="openingDate"
          type="date"
          v-model="form.openingDate"
          required
        />
      </div>
    </div>

    <div class="step" v-else>
      <div class="form-group">
        <label for="name">Nome: </label>
        <input id="name" type="text" v-model="form.name" required />
      </div>
      <InputCpf v-model="form.cpf" @valid="cpfIsValid = $event" />
      <div class="form-group">
        <label for="birthdate">Data de aniversario:</label>
        <input id="birthdate" type="date" v-model="form.birthdate" required />
      </div>
    </div>

    <InputTel v-model="form.phone" @valid="phoneIsValid = $event" />
    <InputPassword
      v-model="form.password"
      @valid="passwordIsValid = $event"
      :show-passord="true"
    />

    <div class="actions">
      <button class="btn btn-secondary" @click="emit('back')">Voltar</button>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!canContinue"
        :class="{ disabled: !canContinue }"
        @click="validateAndNext"
      >
        Cadastrar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import InputEmail from "../inputs/InputEmail.vue";
import InputCnpj from "../inputs/InputCnpj.vue";
import InputCpf from "../inputs/InputCpf.vue";
import InputTel from "../inputs/InputTel.vue";
import InputPassword from "../inputs/InputPassword.vue";

const props = defineProps({
  form: Object,
});
const emit = defineEmits(["next", "back"]);

const cpfIsValid = ref(false);
const cnpjIsValid = ref(false);
const phoneIsValid = ref(false);
const emailIsValid = ref(false);
const passwordIsValid = ref(false);

const canContinue = computed(() => {
  if (props.form.type === "PJ") {
    return (
      emailIsValid.value &&
      props.form.razaoSocial?.length > 0 &&
      props.form.openingDate &&
      cnpjIsValid.value &&
      phoneIsValid.value &&
      passwordIsValid.value
    );
  } else {
    return (
      emailIsValid.value &&
      props.form.name?.length > 0 &&
      props.form.birthdate &&
      cpfIsValid.value &&
      phoneIsValid.value &&
      passwordIsValid.value
    );
  }
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

.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}
</style>
