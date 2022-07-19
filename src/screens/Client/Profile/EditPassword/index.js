import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  Platform,
} from 'react-native';
import Background from '../../../../components/Background';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';
const EditPassword = () => {
  const [viewCurrentyPassword, setViewCurrentyPassword] = useState(true);
  const [newPassword, setNewPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  return (
    <Background style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#333"
          placeholder="Senha atual"
          underlineColorAndroid="transparent"
          secureTextEntry={viewCurrentyPassword}
          onChangeText={() => {}}
        />

        {viewCurrentyPassword ? (
          <Icon
            name="eye"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setViewCurrentyPassword(!viewCurrentyPassword);
            }}
          />
        ) : (
          <Icon
            name="eye-slash"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setViewCurrentyPassword(!viewCurrentyPassword);
            }}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={25} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Nova senha"
          placeholderTextColor="#333"
          underlineColorAndroid="transparent"
          secureTextEntry={newPassword}
          onChangeText={() => {}}
        />

        {newPassword ? (
          <Icon
            name="eye"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setNewPassword(!newPassword);
            }}
          />
        ) : (
          <Icon
            name="eye-slash"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setNewPassword(!newPassword);
            }}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={25} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Confirme a nova senha"
          placeholderTextColor="#333"
          underlineColorAndroid="transparent"
          secureTextEntry={confirmPassword}
          onChangeText={() => {}}
        />
        {confirmPassword ? (
          <Icon
            name="eye"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setConfirmPassword(!confirmPassword);
            }}
          />
        ) : (
          <Icon
            name="eye-slash"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setConfirmPassword(!confirmPassword);
            }}
          />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.textButton}>Salvar Senha</Text>
      </TouchableOpacity>
    </Background>
  );
};

export default EditPassword;
