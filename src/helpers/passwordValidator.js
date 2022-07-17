export function passwordValidator(password) {
  if (!password) {
    return 'O campo senha é obrigatório.';
  }
  if (password.length < 5) {
    return 'A senha deve ser maior que 5 caracteres';
  }
  return '';
}
