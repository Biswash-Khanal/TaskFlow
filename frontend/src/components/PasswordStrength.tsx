// utils/passwordStrength.ts
export function passwordStrength(password: string): number {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[(){}[\]_?<>!@#$%^&*+=;:"'\\|`~.]/.test(password)) score++;

  return score; // 0–4
}
