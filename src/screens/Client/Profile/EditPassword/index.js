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
  const [viewPassword, setViewPassword] = useState(true);

  return (
    <Background style={styles.container}>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#333" style={styles.icon} />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#000"
          placeholder="Senha atual"
          underlineColorAndroid="transparent"
          secureTextEntry={viewPassword}
          onChangeText={() => {}}
        />

        {viewPassword ? (
          <Icon
            name="eye"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setViewPassword(!viewPassword);
            }}
          />
        ) : (
          <Icon
            name="eye-slash"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setViewPassword(!viewPassword);
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
          placeholderTextColor="#000"
          underlineColorAndroid="transparent"
          secureTextEntry={viewPassword}
          onChangeText={() => {}}
        />

        {viewPassword ? (
          <Icon
            name="eye"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setViewPassword(!viewPassword);
            }}
          />
        ) : (
          <Icon
            name="eye-slash"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setViewPassword(!viewPassword);
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
          placeholderTextColor="#000"
          underlineColorAndroid="transparent"
          secureTextEntry={viewPassword}
          onChangeText={() => {}}
        />
        {viewPassword ? (
          <Icon
            name="eye"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setViewPassword(!viewPassword);
            }}
          />
        ) : (
          <Icon
            name="eye-slash"
            size={22}
            color="#333"
            style={styles.icon}
            onPress={() => {
              setViewPassword(!viewPassword);
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
