import React, {useContext, useState, useEffect} from 'react';

import {Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import logo from '../../../assets/logo.png';

import styles from './styles';
import AuthContex from '../../../contexs/auth';

const Home = props => {
  const {signOut} = useContext(AuthContex);

  const handlesignOut = () => {
    signOut();
  };
  return (
    <View style={styles.container}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>

      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('HomeDriver')}
          style={styles.button}
          activeOpacity={0.5}>
          <Icon name="list" size={30} color="grey" />
          <Text style={styles.textButton}>MOTORISTAS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('HomeDeliveryMan')}
          style={styles.button}
          activeOpacity={0.5}>
          <Icon name="person" size={30} color="grey" />
          <Text style={styles.textButton}>CLIENTES</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Reports')}>
          <Icon name="list" size={30} color="grey" />
          <Text style={styles.textButton}>RELATÓRIOS</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonLogout}
          activeOpacity={0.5}
          onPress={handlesignOut}>
          <FontAwesome name="long-arrow-left" size={30} color="#fff" />
          <View style={styles.containerTextButtonLogout}>
            <Text style={styles.textButtonLogout}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
