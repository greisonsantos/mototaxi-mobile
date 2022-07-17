import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Background from '../../../components/Background';
import {Icon} from 'react-native-elements';

import Button from '../../../components/Button';
import AuthContex from '../../../contexs/auth';
import styles from './styles';

export default function Home({navigation}) {
  const {signOut} = useContext(AuthContex);

  const handlesignOut = () => {
    signOut();
  };

  return (
    <Background>
      <View style={styles.container}>
        <TouchableOpacity
          disabled={false}
          onPress={() => {}}
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
          onPress={() => {}}
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

      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'StartScreen'}],
          })
        }>
        Minhas Corridas
      </Button>

      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'StartScreen'}],
          })
        }>
        Perfil
      </Button>

      <Button mode="outlined" onPress={handlesignOut}>
        Sair
      </Button>
    </Background>
  );
}
