import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';


import AwesomeAlert from 'react-native-awesome-alerts';
import api from '../../../../services/api';
import mask from '../../../../Utils/mask';


import styles from './styles';

const NewDeliveryMan = (props) => {

  const [full_name, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [plate, setPlate] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false)
  const [required, setRequired] = useState(false)


  const handleSubmit = async (prosp) => {


    if (!full_name || !phone || !plate || !username || !password ) {
      setRequired(true)
      return
    }

    if (password != confirm_password) {
      setError(true)
      return
    }


    try {
      setloading(true);
      const response = await api.post('/users', {
        full_name,
        phone,
        plate,
        username,
        password,

      });

      if (response.status === 201) {
        setSuccess(true)
      }
      setloading(false);

    } catch (err) {
      setloading(false);
    }

  }

  return (
    <View style={styles.container}>
      
      <ScrollView showsVerticalScrollIndicator={false}  >
        <View style={styles.form}>

          <Text> Nome do motoboy *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Nome do motoboy"
            underlineColorAndroid="transparent"
            value={full_name}
            onChangeText={text => setFullName(text)}

          />

          <Text> Placa da Moto *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Placa da moto"
            underlineColorAndroid="transparent"
            value={plate}
            onChangeText={text => setPlate(text)}

          />

          <Text> Telefone *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="(00) 00000-0000"
            underlineColorAndroid="transparent"
            value={phone}
            onChangeText={text => setPhone(mask.phoneMask(text))}
          />

          <Text> Usuário para login *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Usuário para login"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => setUsername(text)}

          />

          <Text> Senha *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Senha"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}

          />

          <Text> Confirmação de senha *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Confirmação de senha"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            value={confirm_password}
            onChangeText={text => setConfirmPassword(text)}

          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>



      <AwesomeAlert
        show={loading}
        showProgress={true}
        message="carregando"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
        confirmButtonColor="#DD6B55"
      />

      <AwesomeAlert
        show={success}
        showProgress={false}
        message="Motoboy cadastrado."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="ok"
        onCancelPressed={() => {
          setSuccess(false)
          props.navigation.navigate('HomeAdmin')
        }}
        showConfirmButton={false}
        confirmButtonColor="#DD6B55"
      />

      <AwesomeAlert
        show={error}
        showProgress={false}
        message="Atenção, Senhas diferentes"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="ok"
        onCancelPressed={() => { setError(false) }}
        showConfirmButton={false}
        confirmButtonColor="#DD6B55"
      />

      <AwesomeAlert
        show={required}
        showProgress={false}
        message="Atenção, Campos obrigatórios em branco"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="ok"
        onCancelPressed={() => { setRequired(false) }}
        showConfirmButton={false}
        confirmButtonColor="#DD6B55"
      />
    </View>
  );
}

export default NewDeliveryMan;