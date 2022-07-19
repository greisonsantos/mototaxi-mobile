import React from 'react';

import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Background from '../../../../components/Background';
import styles from './styles';

const EditPersonalData = () => {
  return (
    <Background>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} style={styles.icon} color="#333" />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Nome completo ..."
              placeholderTextColor="#000"
              underlineColorAndroid="transparent"
              onChangeText={() => {}}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} style={styles.icon} color="#333" />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholderTextColor="#000"
              autoCorrect={false}
              textContentType="emailAddress"
              placeholder="e-mail"
              underlineColorAndroid="transparent"
              onChangeText={() => {}}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="file" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="CPF ..."
              placeholderTextColor="#000"
              underlineColorAndroid="transparent"
              onChangeText={() => {}}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={25} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#000"
              placeholder="(00) 0000-00000"
              underlineColorAndroid="transparent"
              onChangeText={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="user" size={25} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#000"
              placeholder="usuario para login"
              underlineColorAndroid="transparent"
              onChangeText={() => {}}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.textButton}>Salvar dados</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
};

export default EditPersonalData;
