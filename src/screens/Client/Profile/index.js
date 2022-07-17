import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Background from '../../../components/Background';
import styles from './styles';

const Profile = () => {
  return (
    <Background style={styles.container}>
      <Text style={styles.text}> perfil</Text>

      <TouchableOpacity>
        <Text style={styles.text}> nome</Text>
      </TouchableOpacity>

    </Background>
  );
};

export default Profile;
