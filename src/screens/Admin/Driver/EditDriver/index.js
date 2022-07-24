import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import api from '../../../../services/api';

import styles from './styles';

const EditUser = ({navigation, route}) => {
  useEffect(() => {
    const id = route.params?.id;
    setUserId(id);
    getUser(id);
  }, [route.params?.id]);

  const getUser = async id => {
    const response = await api.get(`/users/${id}`);

    const {data} = response;

    setFullName(data.full_name);
    setPlate(data.plate);
    setUsername(data.username);
    setPhone(data.phone);
  }
  const [full_name, setFullName] = useState('');
  const [plate, setPlate] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const [user_id, setUserId] = useState('');
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [required, setRequired] = useState(false);

  const handleSubmit = async () => {
    if (!full_name || !plate || !phone || !username) {
      setRequired(true);
      return;
    }

    if (password || confirm_password) {
      if (password != confirm_password) {
        setError(true);
        return;
      }
    }

    try {
      setloading(true);
      const response = await api.put(`/users/${user_id}`, {
        full_name,
        plate,
        username,
        password,
        phone,
      });

      if (response.status === 200) {
        setSuccess(true);
      }
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text> Nome do motoboy *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Nome  do motoboy"
            underlineColorAndroid="transparent"
            value={full_name}
            onChangeText={text => setFullName(text)}
          />

          <Text> Placa da Moto *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="placa da moto"
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
            onChangeText={text => setPhone(text)}
          />
          <Text> Usuário para login *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="usuário para login"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => setUsername(text)}
          />

          <Text> Senha *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="senha"
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
            placeholder="confirmação de senha"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            value={confirm_password}
            onChangeText={text => setConfirmPassword(text)}
          />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>EDITAR</Text>
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
        message="usuário editado."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="ok"
        onCancelPressed={() => {
          setSuccess(false);
          navigation.navigate('HomeAdmin');
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
        onCancelPressed={() => {
          setError(false);
        }}
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
        onCancelPressed={() => {
          setRequired(false);
        }}
        showConfirmButton={false}
        confirmButtonColor="#DD6B55"
      />
    </View>
  );
};
export default EditUser;
