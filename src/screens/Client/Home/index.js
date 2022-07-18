import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Background from '../../../components/Background';
import {Icon} from 'react-native-elements';

import Button from '../../../components/Button';
import AuthContex from '../../../contexs/auth';
import styles from './styles';
import {theme} from '../../../core/theme';

export default function Home({navigation}) {
  const {signOut, user} = useContext(AuthContex);

  const handlesignOut = () => {
    signOut();
  };

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
            navigation.navigate('CreateRace', {
              parmas: {
                type: 'motocycle',
              },
            });
          }}
          style={styles.card}>
          <View style={styles.viewIcon}>
            <Image
              source={{uri: 'https://links.papareact.com/3pn'}}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: 120, height: 120, resizeMode: 'contain'}}
            />
            <Text style={styles.text}>Solicitar Moto</Text>
            <Icon raised name="heartbeat" type="font-awesome" color="#f50" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={false}
          onPress={() => {
            navigation.navigate('CreateRace', {
              parmas: {
                type: 'car',
              },
            });
          }}
          style={styles.card}>
          <View style={styles.viewIcon}>
            <Image
              source={{uri: 'https://links.papareact.com/3pn'}}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: 120, height: 120, resizeMode: 'contain'}}
            />
            <Text style={styles.text}>Solicitar Carro</Text>
            <Icon raised name="heartbeat" type="font-awesome" color="#f50" />
          </View>
        </TouchableOpacity>
      </View>

      <Button mode="outlined" onPress={() => navigation.navigate('ListRace')}>
        Minhas Corridas
      </Button>

      <Button mode="outlined" onPress={() => navigation.navigate('Profile')}>
        Perfil
      </Button>

      <Button mode="outlined" onPress={handlesignOut}>
        Sair
      </Button>
    </Background>
  );
}
