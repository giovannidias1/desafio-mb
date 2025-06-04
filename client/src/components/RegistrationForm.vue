<template>
  <div class="wrap">
    <form>
      <component
        :is="currentStepComponent"
        :form="form"
        @next="step === 4 ? submit() : step++"
        @back="step--"
        :data="step === 4 ? form : null"
      />
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from "vue";

import StepEmail from "./steps/StepEmail.vue";
import StepNatural from "./steps/StepNatural.vue";
import StepLegal from "./steps/StepLegal.vue";
import StepPassword from "./steps/StepPassword.vue";
import StepReview from "./steps/StepReview.vue";

const step = ref(1);

const form = reactive({
  email: "",
  type: "",
  name: "",
  cpf: "",
  birthdate: "",
  phone: "",
  razaoSocial: "",
  cnpj: "",
  openingDate: "",
  password: "",
});

const stepsMap = computed(() => {
  console.log(form.type);
  return {
    1: StepEmail,
    2: form.type === "PF" ? StepNatural : StepLegal,
    3: StepPassword,
    4: StepReview,
  };
});

const currentStepComponent = computed(() => stepsMap.value[step.value]);

const submit = async () => {
  try {
    const response = await fetch("http://localhost:3000/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const error = await response.json();
      alert("Erro: " + (error.message || "Erro ao enviar dados"));
      return;
    }

    alert("Cadastro realizado com sucesso!");
  } catch (err) {
    alert("Erro: " + err.message);
  }
};
</script>

<style>
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
</style>
