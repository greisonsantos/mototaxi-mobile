import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';
import api from '../../../../services/api';
import mask from '../../../../helpers/mask';
import {Picker} from '@react-native-community/picker';

import styles from './styles';

const NewDeliveryMan = props => {
  const [full_name, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');
  const [vehicle_description, setvehicleDescription] = useState('');
  const [type_vehicle, setTypevehicle] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [required, setRequired] = useState(false);

  const handleSubmit = async () => {
    if (
      !full_name ||
      !phone ||
      !plate ||
      !username ||
      !vehicle_description ||
      !color ||
      !type_vehicle ||
      type_vehicle === '0' ||
      !password | !confirm_password
    ) {
      setRequired(true);
      return;
    }

    if (password !== confirm_password) {
      setError(true);
      return;
    }

    try {
      setloading(true);
      const response = await api.post('/users', {
        full_name,
        phone,
        plate,
        vehicle_description,
        color,
        type_vehicle,
        username,
        password,
      });

      if (response.status === 201) {
        setSuccess(true);
      }
      setloading(false);
    } catch (err) {
      Alert.alert(
        'Atenção',
        'Erro ao cadastrar motorista verifique se os dados de placa, usuario de login não existem na base! se sim altere para continuar.',
      );
      setloading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          color: '#000',
          textAlign: 'center',
          marginTop: 5,
          fontSize: 20,
        }}>
        {' '}
        CADASTRO DE MOTORISTA{' '}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <Text style={{color: '#000', fontWeight: 'bold'}}>
            {' '}
            Nome do motorista *
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Nome do motorista"
            placeholderTextColor="#333"
            underlineColorAndroid="transparent"
            value={full_name}
            onChangeText={text => setFullName(text)}
          />

          <Text style={{color: '#000', fontWeight: 'bold'}}>
            {' '}
            Tipo do Veiculo *
          </Text>
          <Picker
            selectedValue={type_vehicle}
            style={styles.inputSelect}
            onValueChange={value => setTypevehicle(value)}>
            <Picker.Item label="Clique para selecionar..." value={'0'} />
            <Picker.Item key={1} label="Moto" value="motorcycle" />
            <Picker.Item key={2} label="Carro" value="car" />
          </Picker>

          <Text style={{color: '#000', fontWeight: 'bold'}}>
            {' '}
            Placa da Veiculo *
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Placa da veiculo"
            placeholderTextColor="#333"
            underlineColorAndroid="transparent"
            value={plate}
            onChangeText={text => setPlate(text)}
          />

          <Text style={{color: '#000', fontWeight: 'bold'}}>
            {' '}
            Cor do veiculo *
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Cor do veiculo"
            placeholderTextColor="#333"
            underlineColorAndroid="transparent"
            value={color}
            onChangeText={text => setColor(text)}
          />

          <Text style={{color: '#000', fontWeight: 'bold'}}>
            {' '}
            Descrição do veiculo *
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Ex: Titan 150 | Fiat palio"
            placeholderTextColor="#333"
            underlineColorAndroid="transparent"
            value={vehicle_description}
            onChangeText={text => setvehicleDescription(text)}
          />

          <Text style={{color: '#000', fontWeight:'bold'}}> Telefone *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="(00) 00000-0000"
            placeholderTextColor="#333"
            underlineColorAndroid="transparent"
            value={phone}
            onChangeText={text => setPhone(mask.phoneMask(text))}
          />

          <Text style={{color: '#000', fontWeight: 'bold'}}>
            {' '}
            Usuário para login *
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Usuário para login"
            placeholderTextColor="#333"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => setUsername(text)}
          />

          <Text style={{color: '#000', fontWeight:'bold'}}> Senha *</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Senha"
            placeholderTextColor="#333"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setPassword(text)}
          />

          <Text style={{color: '#000', fontWeight: 'bold'}}>
            {' '}
            Confirmação de senha *
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#333"
            placeholder="Confirmação de senha"
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            value={confirm_password}
            onChangeText={text => setConfirmPassword(text)}
          />
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={handleSubmit}>
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
        message="Motorista cadastrado."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="ok"
        onCancelPressed={() => {
          setSuccess(false);
          props.navigation.navigate('Home');
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

export default NewDeliveryMan;
