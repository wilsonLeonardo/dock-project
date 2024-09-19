export default function isValidCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  const digits = cpf.split('').map(Number);
  const [d1, d2] = digits.slice(-2);

  const calculateDigit = (digits: Array<number>, factor: number) => {
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      sum += digits[i] * factor--;
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  const checkDigit1 = calculateDigit(digits.slice(0, 9), 10);
  const checkDigit2 = calculateDigit(digits.slice(0, 10), 11);

  return checkDigit1 === d1 && checkDigit2 === d2;
}
