export function usernameValidator(email) {
  if (!email) {
    return 'O campo usuário e obrigatório.';
  }
  return '';
}
