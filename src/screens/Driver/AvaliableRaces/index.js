import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Pulse from 'react-native-pulse';

import Header from '../../../components/Header';
import api from '../../../services/api';
import dateFormat from 'dateformat';

import styles from './styles';

const AvaliableRaces = () => {
  const [races, setRaces] = useState([]);

  const getRaces = async () => {
    const response = await api.get('/races');
    const {data} = response;

    setRaces(data.finaly_races);
  };

  useEffect(() => {
    getRaces();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.cardContainer}>
      <View>
        <View>
          <Text style={styles.date}>
            DATA: {dateFormat(item.date, 'dd/mm/yyyy')}
          </Text>
        </View>

        <View>
          <Text style={styles.text}>De: {item.street_origin}</Text>
          <Text style={styles.text}>Para: {item.street_destination}</Text>
          <Text style={styles.text}>
            Veiculo solicitado:{' '}
            {item.vehicle_type === 'motocycle' ? 'Moto' : 'Carro'}
          </Text>
          <Text style={styles.text}> Motorista: {item.full_name}</Text>
          <Text style={styles.text}> Veiculo: {item.vehicle_description}</Text>
          <Text style={styles.text}> Placa: {item.plate}</Text>

          <Text style={styles.text}>
            {' '}
            Forma de pagamento:
            {item.payment_type === 'cash' && ' DINHEIRO'}
            {item.payment_type === 'card_credit' && ' CARTÃO DE CRÉDITO'}
            {item.payment_type === 'card_debit' && 'CARTÃO DE DEBITO'}
            {item.payment_type === 'pix' && ' PIX'}
          </Text>
        </View>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Header> CORRIDAS DISPONIVEIS</Header>

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={races}
          renderItem={renderItem}
          keyExtractor={item => item.race_id.toString()}
        />
      </View>
    </View>
  );
};

export default AvaliableRaces;
