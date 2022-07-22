import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, ScrollView, Keyboard} from 'react-native';
import Background from '../../../../components/Background';
import Header from '../../../../components/Header';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import {theme} from '../../../../core/theme';
import {
  passwordValidator,
  confimPasswordValidator,
} from '../../../../helpers/validator';
import api from '../../../../services/api';
import Toast from 'react-native-simple-toast';
import AuthContex from '../../../../contexs/auth';

export default function EditPassword({navigation}) {
  const {user} = useContext(AuthContex);

  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSignUpPressed = async () => {
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confimPasswordValidator(
      password.value,
      confirmPassword.value,
    );

    Keyboard.dismiss();
    if (passwordError || confirmPasswordError) {
      setPassword({...password, error: passwordError});
      setConfirmPassword({...confirmPassword, error: confirmPasswordError});
      return;
    }

    setIsLoading(true);
    try {
      await api.put(`/clients/${userId}`, {
        password: password.value,
      });

      navigation.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      });
      setIsLoading(false);
      Toast.showWithGravity(
        'Atenção, Senha alterada com sucesso!',
        Toast.LONG,
        Toast.TOP,
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Toast.showWithGravity(
        'Atenção, Erro ao tentar alterar senha',
        Toast.LONG,
        Toast.TOP,
      );
    }
  };

  useEffect(() => {
    setUserId(user.id);
  }, [user]);

  return (
    <Background>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Header>Editar Senha</Header>
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
            Editar Senha
          </Button>
        )}
      </ScrollView>
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
    color: theme.colors.primary,
  },
});
