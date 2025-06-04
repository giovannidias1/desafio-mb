<template>
  <div class="step">
    <InputPassword v-model="form.password" @valid="passwordIsValid = $event" />

    <div class="actions">
      <button class="btn btn-secondary" @click="emit('back')">Voltar</button>

      <button
        class="btn btn-primary"
        :disabled="!passwordIsValid || !form.password"
        :class="{ disabled: !passwordIsValid || !form.password }"
        @click="validateAndNext"
      >
        Continuar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputPassword from "../inputs/InputPassword.vue";

const props = defineProps({
  form: Object,
});
const emit = defineEmits(["next", "back"]);

const passwordIsValid = ref(false);

const validateAndNext = () => {
  if (!passwordIsValid.value || !props.form.password) return;
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
