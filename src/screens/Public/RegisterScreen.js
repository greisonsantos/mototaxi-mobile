import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {theme} from '../../core/theme';
import {
  usernameValidator,
  nameValidator,
  passwordValidator,
  confimPasswordValidator,
  phoneValidator,
  emailValidator,
  cpfValidator,
} from '../../helpers/validator';
import api from '../../services/api';
import Toast from 'react-native-simple-toast';
import mask from '../../helpers/mask';

export default function RegisterScreen({navigation}) {
  const [name, setName] = useState({value: '', error: ''});
  const [username, setUsername] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [phone, setPhone] = useState({value: '', error: ''});
  const [cpf, setCpf] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const usernameError = usernameValidator(username.value);
    const emailError = emailValidator(email.value);
    const phoneError = phoneValidator(phone.value);
    const cpfError = cpfValidator(cpf.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confimPasswordValidator(
      password.value,
      confirmPassword.value,
    );

    Keyboard.dismiss();
    if (
      nameError ||
      usernameError ||
      emailError ||
      phoneError ||
      cpfError ||
      passwordError ||
      confirmPasswordError
    ) {
      setName({...name, error: nameError});
      setUsername({...username, error: usernameError});
      setEmail({...email, error: emailError});
      setPhone({...phone, error: phoneError});
      setCpf({...cpf, error: cpfError});
      setPassword({...password, error: passwordError});
      setConfirmPassword({...confirmPassword, error: confirmPasswordError});
      return;
    }

    setIsLoading(true);
    try {
      await api.post('clients', {
        username: username.value,
        full_name: name.value,
        cpf: cpf.value,
        phone: phone.value,
        email: email.value,
        password: password.value,
        addres: '',
      });

      navigation.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      });
      setIsLoading(false);
      Toast.showWithGravity(
        'Atenção, Usuário cadastrado com sucesso, faça login para continuar',
        Toast.LONG,
        Toast.TOP,
      );
    } catch (error) {
      console.log(error)
      setIsLoading(false);
      Toast.showWithGravity(
        'Atenção, Erro ao tentar cadastrar Usuário',
        Toast.LONG,
        Toast.TOP,
      );
    }
  };

  return (
    <Background>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Header>Criar conta</Header>
        <TextInput
          label="Nome completo"
          returnKeyType="next"
          value={name.value}
          onChangeText={text => setName({value: text, error: ''})}
          error={!!name.error}
          errorText={name.error}
        />

        <TextInput
          label="Usuário de aceso"
          returnKeyType="next"
          value={username.value}
          onChangeText={text => setUsername({value: text, error: ''})}
          error={!!username.error}
          errorText={username.error}
        />
        <TextInput
          label="E-mail"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Telefone"
          returnKeyType="next"
          value={phone.value}
          onChangeText={text =>
            setPhone({value: mask.phoneMask(text), error: ''})
          }
          error={!!phone.error}
          errorText={phone.error}
          autoCompleteType="phone"
          keyboardType="numeric"
        />
        <TextInput
          label="CPF"
          returnKeyType="next"
          value={cpf.value}
          onChangeText={text =>
            setCpf({value: mask.validaCpf(text), error: ''})
          }
          error={!!cpf.error}
          errorText={cpf.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="numeric"
        />
        <TextInput
          label="Senha"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({value: text, error: ''})}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <TextInput
          label="Confirmação de senha"
          returnKeyType="done"
          value={confirmPassword.value}
          onChangeText={text => setConfirmPassword({value: text, error: ''})}
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry
        />
      </ScrollView>
      {isLoading ? (
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginTop: 24}}>
          carregando...
        </Button>
      ) : (
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginTop: 24}}>
          Criar conta
        </Button>
      )}

      <View style={styles.row}>
        <Text>Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});
