<script setup>
import { computed, ref } from "vue";
import { calculate } from "./calculator.js";

const firstNumber = ref("");
const secondNumber = ref("");
const operation = ref("add");

const isDivisionByZero = computed(
  () =>
    operation.value === "divide" &&
    secondNumber.value !== "" &&
    Number(secondNumber.value) === 0,
);
const result = computed(() =>
  calculate(firstNumber.value, secondNumber.value, operation.value),
);
const formattedResult = computed(() => {
  if (result.value === null) return "—";

  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 10 }).format(
    result.value,
  );
});
const statusMessage = computed(() => {
  if (isDivisionByZero.value) return "Divisão por zero não é definida.";
  if (result.value === null) return "— aguardando valores";

  return "resultado atualizado";
});
</script>

<template>
  <main class="page-shell">
    <header class="topbar">
      <a class="wordmark" href="#inicio" aria-label="Conta Clara, início">
        <span class="mark" aria-hidden="true"
          ><i></i><i></i><i></i><i></i
        ></span>
        <span>conta<span class="wordmark-dot">.</span>clara</span>
      </a>
      <span class="course-tag"
        ><span class="status-dot"></span> CALCULADORA ARITMÉTICA</span
      >
    </header>

    <section id="inicio" class="calculator-layout" aria-labelledby="page-title">
      <div class="intro">
        <p class="eyebrow"><span>01</span> / MATEMÁTICA DO DIA A DIA</p>
        <h1 id="page-title">Conta<br /><em>clara.</em></h1>
        <p class="intro-note">
          Quatro operações.<br />Uma resposta de cada vez.
        </p>
        <div class="accent-line" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </div>

      <div class="calculator" aria-label="Calculadora">
        <div class="result-panel">
          <div class="result-heading">
            <span>RESULTADO</span>
            <span class="live-indicator"><i></i> AO VIVO</span>
          </div>
          <output class="result-value" aria-live="polite" aria-atomic="true">{{
            formattedResult
          }}</output>
          <p
            class="result-status"
            :class="{ 'is-error': isDivisionByZero }"
            aria-live="polite"
          >
            {{ statusMessage }}
          </p>
          <span class="result-decoration" aria-hidden="true">=</span>
        </div>

        <div class="controls">
          <label class="field">
            <span class="field-label"
              ><span class="field-index">A</span> PRIMEIRO NÚMERO</span
            >
            <input
              v-model.number="firstNumber"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder="0"
              aria-label="Primeiro número"
            />
          </label>

          <label class="field operation-field">
            <span class="field-label"
              ><span class="field-index">±</span> OPERAÇÃO</span
            >
            <select v-model="operation" aria-label="Operação aritmética">
              <option value="add">+ &nbsp; Adição</option>
              <option value="subtract">− &nbsp; Subtração</option>
              <option value="multiply">× &nbsp; Multiplicação</option>
              <option value="divide">÷ &nbsp; Divisão</option>
            </select>
          </label>

          <label class="field">
            <span class="field-label"
              ><span class="field-index">B</span> SEGUNDO NÚMERO</span
            >
            <input
              v-model.number="secondNumber"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder="0"
              aria-label="Segundo número"
            />
          </label>
        </div>

        <footer class="calculator-footer">
          <span>VUE.JS <b>3</b></span>
          <span>SEM BOTÃO, SEM ESPERA <i aria-hidden="true">↗</i></span>
        </footer>
      </div>
    </section>

    <footer class="page-footer">
      <span>ESTÚDIO DE MATEMÁTICA <span class="footer-mark">✳</span></span>
      <span>ADIÇÃO · SUBTRAÇÃO · MULTIPLICAÇÃO · DIVISÃO</span>
    </footer>
  </main>
</template>
