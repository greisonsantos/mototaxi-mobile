export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "E-mail não pode ser vazio."
  if (!re.test(email)) return 'E-mail deve ser válido.'
  return '';
}
