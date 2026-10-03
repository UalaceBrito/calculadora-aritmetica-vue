import assert from 'node:assert/strict'
import test from 'node:test'
import { calculate } from '../src/calculator.js'

test('calcula as quatro operações aritméticas', () => {
  assert.equal(calculate(12, 4, 'add'), 16)
  assert.equal(calculate(12, 4, 'subtract'), 8)
  assert.equal(calculate(12, 4, 'multiply'), 48)
  assert.equal(calculate(12, 4, 'divide'), 3)
})

test('aceita números decimais e operandos recebidos como texto', () => {
  assert.equal(calculate('1.5', '2.25', 'add'), 3.75)
})

test('não calcula com campos vazios, valores inválidos ou divisão por zero', () => {
  assert.equal(calculate('', 4, 'add'), null)
  assert.equal(calculate('abc', 4, 'add'), null)
  assert.equal(calculate(12, 0, 'divide'), null)
})
