import React, {useContext, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View, Alert} from 'react-native';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import AuthContex from '../../../contexs/auth';
import styles from './styles';
import {theme} from '../../../core/theme';
import api from '../../../services/api';
import Toast from 'react-native-toast-message';

import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

export default function Home({navigation}) {
  const {user} = useContext(AuthContex);

  //Depois que o aplicativo for iniciado, você poderá chamar o getToken método no módulo Cloud Messaging para obter o token exclusivo do dispositivo:
  useEffect(() => {
    getToken();
  }, []);

  // verifica se possui token no asynsStorage senão gera um
  const getToken = async () => {
    const token = await AsyncStorage.getItem('@tokenNotif');

    if (token) {
      return;
    } else {
      messaging()
        .getToken()
        .then(token => {
          if (token) {
            return saveTokenToDatabase(token);
          } else {
            messaging()
              .requestPermission()
              // eslint-disable-next-line no-shadow
              .then(token => {
                saveTokenToDatabase(token);
              });
          }
        });
    }
  };

  useEffect(() => {
    //recebendo mensagen quando o app estive aberto
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(JSON.stringify(remoteMessage));
      Toast.show({
        type: 'success',
        text1: 'Atenção',
        text2: 'Nova Corrida cadastrada! Verifique sua lista.',
        visibilityTime: 7000,
      });
    });
    return unsubscribe;
  }, []);

  // recebendo mensagens quando o app tiver em segundo plano
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  //salva o token no banco de dados e no async storage
  async function saveTokenToDatabase(token) {
    const user_id = user.id;

    const device_token = token;
    try {
      await api.post('/devices', {
        user_id,
        device_token,
      });
      await AsyncStorage.setItem('@tokenNotif', token);
    } catch (err) {
      console.log(err);
      Alert.alert('Erro interno, tente novamente mais tarde');
    }
  }

  return (
    <Background>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontWeight: 'bold',
          color: theme.colors.primary,
          fontSize: 23,
        }}
        numberOfLines={1}>
        Bem vindo !
      </Text>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          fontWeight: 'bold',
          color: theme.colors.primary,
          fontSize: 18,
        }}>
        {user?.full_name}
      </Text>
      <View style={styles.container}>
        <TouchableOpacity
          disabled={false}
          onPress={() => {
            navigation.navigate('AvaliableRaces');
          }}
          style={styles.card}>
          <View style={styles.viewIcon}>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
              }}>
              <Image
                source={require('../../../assets/moto.png')}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 115,
                  height: 120,
                  top: 10,
                  resizeMode: 'contain',
                }}
              />
              <Text style={styles.text}> CORRIDAS DISPONIVEIS</Text>
              <Image
                source={require('../../../assets/image-car.png')}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  width: 115,
                  height: 120,
                  top: 5,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <Button mode="outlined" onPress={() => navigation.navigate('ListRace')}>
        Minhas Corridas
      </Button>

      <Button mode="outlined" onPress={() => navigation.navigate('Profile')}>
        Perfil
      </Button>
    </Background>
  );
}
