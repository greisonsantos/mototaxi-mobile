import React, {useState, useContext, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Paragraph from '../../components/Paragraph';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import {theme} from '../../core/theme';
import {usernameValidator, passwordValidator} from '../../helpers/validator';

import AuthContex from '../../contexs/auth';

export default function LoginScreen({navigation}) {
  const [username, setusername] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {signIn, error_login, setErrorLogin} = useContext(AuthContex);

  const onLoginPressed = () => {
    const usernameError = usernameValidator(username.value);
    const passwordError = passwordValidator(password.value);

    if (usernameError || passwordError) {
      setusername({...username, error: usernameError});
      setPassword({...password, error: passwordError});
      return;
    }

    setIsLoading(true);
    try {
      signIn(username.value.trim(), password.value);
      setIsLoading(false);
      setError(false);
      setErrorLogin(null);
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      setIsLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    setIsLoading(false);
    console.log(error_login)
    if (error_login) {
      setError(true);
    }
  }, [error_login]);

  return (
    <Background>
      <Logo />
      <Paragraph>BEM VINDO DE VOLTA!</Paragraph>

      {error && (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={{color: '#FF0000'}}> usuario ou senha incorreto</Text>
      )}
      <TextInput
        label="usuario"
        returnKeyType="next"
        value={username.value}
        onChangeText={text => setusername({value: text, error: ''})}
        error={!!username.error}
        errorText={username.error}
        autoCapitalize="none"
        autoCompleteType="username"
        textContentType="usernameAddress"
        keyboardType="username-address"
      />
      <TextInput
        label="senha"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          {/*  <Text style={styles.forgot}>Esqueceu sua senha?</Text> */}
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <Button
          mode="contained"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginTop: 24}}>
          carregando...
        </Button>
      ) : (
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
      )}
      <View style={styles.row}>
        <Text>Não tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.white,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.black,
  },
});
