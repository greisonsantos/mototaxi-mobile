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
            {user?.full_name}
          </Text>
          <Text style={styles.name}> {user?.cpf}</Text>
          <Text style={styles.name}> {user?.phone}</Text>
          <Text style={styles.name}> {user?.email}</Text>
        </View>

        <View style={styles.nav}>
          <TouchableOpacity
            style={styles.navItens}
            onPress={() => {
              props.navigation.push('EditPersonalData');
            }}>
            <Icon
              style={styles.navIcon}
              name="file"
              size={15}
              color="#560CCE"
            />
            <Text style={styles.navText}> Dados pessoais</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItens}
            onPress={() => {
              props.navigation.push('EditPassword');
            }}>
            <Icon
              style={styles.navIcon}
              name="lock"
              size={15}
              color="#560CCE"
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
