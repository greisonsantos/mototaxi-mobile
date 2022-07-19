export function nameValidator(name) {
  if (!name) {
    return 'O campo nome e obrigatório';
  }
  return '';
}

export function usernameValidator(username) {
  if (!username) {
    return 'O campo usuário e obrigatório.';
  }
  return '';
}
export function emailValidator(email) {
  if (!email) {
    return 'O campo e-mail e obrigatório.';
  }
  return '';
}

export function phoneValidator(phone) {
  if (!phone) {
    return 'O campo telefone e obrigatório.';
  }
  return '';
}

export function cpfValidator(cpf) {
  if (!cpf) {
    return 'O campo cpf e obrigatório.';
  }
  return '';
}

export function passwordValidator(password) {
  if (!password) {
    return 'O campo senha é obrigatório.';
  }
  if (password.length < 5) {
    return 'A senha deve ser maior que 5 caracteres';
  }
  return '';
}

export function confimPasswordValidator(password, confirmPassword) {
  if (!password) {
    return 'O campo senha é obrigatório.';
  }
  if (password !== confirmPassword) {
    return 'Os campos de senha não conferem.';
  }
  return '';
}

export function addressValidator(address) {
  if (!address) {
    return 'O campo senha é obrigatório.';
  }
}
