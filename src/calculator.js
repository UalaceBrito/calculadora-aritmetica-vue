const operations = {
  add: (first, second) => first + second,
  subtract: (first, second) => first - second,
  multiply: (first, second) => first * second,
  divide: (first, second) => (second === 0 ? null : first / second),
}

export function calculate(first, second, operation) {
  if (first === '' || second === '' || first === null || second === null) {
    return null
  }

  const firstNumber = Number(first)
  const secondNumber = Number(second)
  const calculateOperation = operations[operation]

  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber) || !calculateOperation) {
    return null
  }

  return calculateOperation(firstNumber, secondNumber)
}
