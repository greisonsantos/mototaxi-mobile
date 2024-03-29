import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthContex from '../../../contexs/auth';
import Background from '../../../components/Background';
import noImage from '../../../assets/noImage.png';

import styles from './styles';

const Profile = props => {
  const {signOut, user} = useContext(AuthContex);

  function handleSignOut() {
    signOut();
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.picutureContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={styles.picture}
              width={150}
              height={150}
              source={noImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.nameContainer}>
          {console.log(user)}
          <Text numberOfLines={2} style={styles.name}>
            {'MOTORISTA: '} {user?.full_name}
          </Text>
          <Text style={styles.name}>
            {'VEICULO: '}
            {user?.vehicle_description}, {user?.color}
          </Text>
          <Text style={styles.name}>
            {'PLACE: '}
            {user?.plate}
          </Text>
        </View>

        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.navItens}
            onPress={() => {
              props.navigation.push('EditPassword');
            }}>
            <Icon
              style={styles.navIcon}
              name="lock"
              size={15}
              color="#87bd43"
            />
            <Text style={styles.navText}> Trocar senha</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signOut} onPress={handleSignOut}>
            <Text style={styles.signOutText}> Sair </Text>
            <Icon
              style={styles.iconSignOut}
              name="sign-in"
              size={20}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

export default Profile;
