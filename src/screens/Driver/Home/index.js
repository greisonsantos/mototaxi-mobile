import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Background from '../../../components/Background';
import Button from '../../../components/Button';
import AuthContex from '../../../contexs/auth';
import styles from './styles';
import {theme} from '../../../core/theme';

export default function Home({navigation}) {
  const {user} = useContext(AuthContex);

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
