import React, {useEffect, useState, useContext} from 'react';
import {ScrollView, Keyboard} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Background from '../../../../components/Background';
import Paragraph from '../../../../components/Paragraph';
import Button from '../../../../components/Button';
import TextInput from '../../../../components/TextInput';
import {
  usernameValidator,
  nameValidator,
  phoneValidator,
  emailValidator,
  cpfValidator,
} from '../../../../helpers/validator';
import AuthContex from '../../../../contexs/auth';
import api from '../../../../services/api';
import Toast from 'react-native-simple-toast';
import mask from '../../../../helpers/mask';
import styles from './styles';

export default function EditPersonalData({navigation}) {
  const {user, setUser} = useContext(AuthContex);

  const [userId, setUserId] = useState(null);
  const [name, setName] = useState({value: '', error: ''});
  const [username, setUsername] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [phone, setPhone] = useState({value: '', error: ''});
  const [cpf, setCpf] = useState({value: '', error: ''});
  const [isLoading, setIsLoading] = useState(false);

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const usernameError = usernameValidator(username.value);
    const emailError = emailValidator(email.value);
    const phoneError = phoneValidator(phone.value);
    const cpfError = cpfValidator(cpf.value);

    Keyboard.dismiss();
    if (nameError || usernameError || emailError || phoneError || cpfError) {
      setName({...name, error: nameError});
      setUsername({...username, error: usernameError});
      setEmail({...email, error: emailError});
      setPhone({...phone, error: phoneError});
      setCpf({...cpf, error: cpfError});
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.put(`/clients/${userId}`, {
        username: username.value,
        full_name: name.value,
        cpf: cpf.value,
        phone: phone.value,
        email: email.value,
        addres: '',
      });

      const {data} = response;
      setUser(data);
      await AsyncStorage.setItem('@entrega:user', JSON.stringify(data));

      navigation.navigate('Profile');
      setIsLoading(false);
      Toast.showWithGravity(
        'Atenção, Dados editado com sucesso!',
        Toast.LONG,
        Toast.TOP,
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Toast.showWithGravity(
        'Atenção, Erro ao tentar cadastrar Usuário',
        Toast.LONG,
        Toast.TOP,
      );
    }
  };

  useEffect(() => {
    setUserId(user.id);
    setName({value: user.full_name, error: ''});
    setUsername({value: user.username, error: ''});
    setEmail({value: user.email, error: ''});
    setPhone({value: user.phone, error: ''});
    setCpf({value: user.cpf, error: ''});
  }, [user]);

  return (
    <Background>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Paragraph>Editar dados</Paragraph>
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
            Editar dados
          </Button>
        )}
      </ScrollView>
    </Background>
  );
}
