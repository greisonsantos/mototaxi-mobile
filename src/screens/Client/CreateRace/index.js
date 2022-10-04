import React, {useEffect, useState} from 'react';
import {View, Text, Keyboard, ScrollView, Alert} from 'react-native';
import {addressValidator} from '../../../helpers/validator';
import Background from '../../../components/Background';
import Button from '../../../components/Button';

import TextInput from '../../../components/TextInput';
import api from '../../../services/api';
import Toast from 'react-native-simple-toast';
import {Picker} from '@react-native-community/picker';

import styles from './styles';

const CreateRace = props => {
  const [origin_address, setOriginAddress] = useState({value: '', error: ''});
  const [origin_reference, setOriginReference] = useState({
    value: '',
    error: '',
  });

  const [destination_address, setDestinationAddress] = useState({
    value: '',
    error: '',
  });
  const [destination_reference, setDestinationReference] = useState({
    value: '',
    error: '',
  });

  const [payment_type, setPaymentType] = useState({
    value: '',
    error: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [vehicle_type, setVehicletype] = useState('');

  const onSignUpPressed = async () => {
    const originAddressError = addressValidator(origin_address.value);
    const destinationAddressError = addressValidator(destination_address.value);

    Keyboard.dismiss();
    if (originAddressError || destinationAddressError) {
      setOriginAddress({...origin_address, error: originAddressError});
      setDestinationAddress({
        ...destination_address,
        error: destinationAddressError,
      });
      return;
    }
    if (payment_type.value === '') {
      return Alert.alert(
        'Atenção',
        'Selecione a forma de pagamento para continuar',
      );
    }

    setIsLoading(true);
    try {
      await api.post('/races', {
        street_origin: origin_address.value,
        complement_origin: '',
        number_origin: '',
        neighborhood_origin: '',
        origin_reference: origin_reference.value,

        payment_type: payment_type.value,
        street_destination: destination_address.value,
        complement_destination: '',
        number_destination: '',
        neighborhood_destination: '',
        destination_reference: destination_reference.value,

        vehicle_type,
      });

      props.navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
      setIsLoading(false);
      Toast.showWithGravity(
        'Atenção, Aguarde até que um motorista aceite sua corrida! ',
        Toast.LONG,
        Toast.TOP,
      );
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Toast.showWithGravity(
        'Atenção, Erro ao solicitar corrida, tente novamente',
        Toast.LONG,
        Toast.TOP,
      );
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    const vehicle_type = props.route.params.parmas.type;
    setVehicletype(vehicle_type);
  }, [props.route.params.parmas.type]);

  return (
    <Background>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.text}>Endereço de origem</Text>
          <TextInput
            label="Endereço completo"
            returnKeyType="next"
            value={origin_address.value}
            onChangeText={text => setOriginAddress({value: text, error: ''})}
            error={!!origin_address.error}
            errorText={origin_address.error}
          />
          <TextInput
            label="Ponto de referência"
            returnKeyType="next"
            value={origin_reference.value}
            onChangeText={text => setOriginReference({value: text, error: ''})}
            error={!!origin_reference.error}
            errorText={origin_reference.error}
          />
        </View>

        <Text style={styles.text}>Endereço de destino</Text>
        <View>
          <TextInput
            label="Endereço completo"
            returnKeyType="next"
            value={destination_address.value}
            onChangeText={text =>
              setDestinationAddress({value: text, error: ''})
            }
            error={!!destination_address.error}
            errorText={destination_address.error}
          />
          <TextInput
            label="Ponto de referência"
            returnKeyType="next"
            value={destination_reference.value}
            onChangeText={text =>
              setDestinationReference({value: text, error: ''})
            }
            error={!!destination_reference.error}
            errorText={destination_reference.error}
          />
        </View>
        <Picker
          selectedValue={payment_type.value}
          style={styles.inputSelect}
          onValueChange={value => setPaymentType({value: value, error: ''})}>
          <Picker.Item label="Forma de pagamento ..." value={'0'} />
          <Picker.Item key={1} label="Dinheiro" value="cash" />
          <Picker.Item key={2} label="Pix" value="pix" />
          <Picker.Item key={3} label="Cartão Crédito" value="card_credit" />
          <Picker.Item key={4} label="Cartão Débito" value="card_debit" />
        </Picker>

        {isLoading ? (
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginTop: 24}}>
            carregando...
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginTop: 24}}>
            Solicitar Corrida
          </Button>
        )}
      </ScrollView>
    </Background>
  );
};

export default CreateRace;
