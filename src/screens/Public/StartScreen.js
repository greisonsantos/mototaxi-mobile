import React from 'react';
import Background from '../../components/Background';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';

export default function StartScreen({navigation}) {
  return (
    <Background>
      <Logo />
      <Paragraph>
        Crie sua conta para solicitar um veículo para sua corrida.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        Login
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Criar conta
      </Button>
    </Background>
  );
}
