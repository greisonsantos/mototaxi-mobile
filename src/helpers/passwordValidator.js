export function passwordValidator(password) {
  if (!password) {
    return 'Senha não pode ser vazio';
  }
  if (password.length < 5) {
    return 'Senha deve ser maior que 5 caracteres';
  }
  return '';
}
