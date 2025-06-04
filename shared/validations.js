export function isValidCPF(cpf) {
  cpf = String(cpf).replace(/\D/g, "");

  if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let check1 = (sum * 10) % 11;
  if (check1 === 10 || check1 === 11) check1 = 0;
  if (check1 !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  let check2 = (sum * 10) % 11;
  if (check2 === 10 || check2 === 11) check2 = 0;
  return check2 === parseInt(cpf.charAt(10));
}

export function isValidCNPJ(input) {
  const cnpj = String(input).replace(/\D/g, "");

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calcCheckDigit = (base, multipliers) => {
    const sum = base
      .split("")
      .reduce((acc, num, idx) => acc + parseInt(num) * multipliers[idx], 0);

    const rest = sum % 11;
    return rest < 2 ? "0" : String(11 - rest);
  };

  const base = cnpj.slice(0, 12);
  const check1 = calcCheckDigit(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const check2 = calcCheckDigit(
    base + check1,
    [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  );

  const isValid = cnpj === base + check1 + check2;
  console.log(isValid);
  return isValid;
}

export function isValidEmail(email) {
  if (!email) return false;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function allowOnlyNumbers(e) {
  const char = String.fromCharCode(e.keyCode || e.which);
  if (!/[0-9]/.test(char)) {
    e.preventDefault();
  }
}

export function isValidPassword(password) {
  if (typeof password !== "string") return false;

  const minLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return minLength && hasNumber && hasUpper && hasLower && hasSpecial;
}
