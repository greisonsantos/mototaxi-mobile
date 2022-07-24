import React, {useEffect, useState, useContext} from 'react';
import {View, Text, FlatList} from 'react-native';
import Pulse from 'react-native-pulse';

import Header from '../../../components/Header';
import api from '../../../services/api';
import dateFormat from 'dateformat';
import Button from '../../../components/Button';
import styles from './styles';
import AuthContex from '../../../contexs/auth';
import Toast from 'react-native-simple-toast';

const AvaliableRaces = ({navigation}) => {
  const {user} = useContext(AuthContex);

  const [races, setRaces] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getRaces = async () => {
    const response = await api.get('/races');
    const {data} = response;

    const my_avaliables_races = data.filter(race => {
      return race.vehicle_type === user.type_vehicle;
    });

    setRaces(my_avaliables_races);
  };

  useEffect(() => {
    getRaces();
  }, [getRaces]);

  const handleGetRace = async race => {
    setIsLoading(true);
    try {
      await api.put(`/races/${race.id}`, {
        status: 2,
      });

      setIsLoading(false);
      Toast.showWithGravity(
        'Atenção, Sucesso você tem uma nova corrida para fazer',
        Toast.LONG,
        Toast.TOP,
      );
      navigation.replace('ListRace');
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      setIsLoading(false);
      Toast.showWithGravity(
        'Atenção, Erro ao pegar Corrida! Verifique sua conexão',
        Toast.LONG,
        Toast.TOP,
      );
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.cardContainer}>
      <View>
        <View>
          <Text style={styles.date}>
            DATA: {dateFormat(item.created_at, 'dd/mm/yyyy  HH:MM:ss')}
          </Text>
        </View>

        <View>
          <Text style={styles.text}>De: {item.street_origin}</Text>
          <Text style={styles.text}>
            Ponto de referência: {item.origin_reference}
          </Text>
          <Text style={styles.text}>Para: {item.street_destination}</Text>
          <Text style={{}}> </Text>
          <Text style={styles.text}>
            Veiculo solicitado:{' '}
            {item.vehicle_type === 'motorcycle' ? 'Moto' : 'Carro'}
          </Text>

          <Text style={styles.text}>
            {' '}
            Forma de pagamento:
            {item.payment_type === 'cash' && ' DINHEIRO'}
            {item.payment_type === 'card_credit' && ' CARTÃO DE CRÉDITO'}
            {item.payment_type === 'card_debit' && 'CARTÃO DE DEBITO'}
            {item.payment_type === 'pix' && ' PIX'}
          </Text>
        </View>
        {isLoading ? (
          <Button
            mode="contained"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginTop: 24}}>
            carregando...
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={() => {
              handleGetRace(item);
            }}>
            Pegar corrida
          </Button>
        )}
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Header> CORRIDAS DISPONIVEIS : {races?.length}</Header>

      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={races}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default AvaliableRaces;
