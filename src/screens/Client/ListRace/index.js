import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Pulse from 'react-native-pulse';

import Header from '../../../components/Header';
import api from '../../../services/api';
import dateFormat from 'dateformat';

import styles from './styles';

const ListRace = () => {
  const [races, setRaces] = useState([]);

  const [current_race, setCurrentRace] = useState(null);

  const getRaces = async () => {
    const response = await api.get('/clients-show-races');
    const {data} = response;

    console.log(data);
    setCurrentRace(data.current_race);
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
            {item.vehicle_type === 'motorcycle' ? 'Moto' : 'Carro'}
          </Text>
          <Text> </Text>
          <Text style={styles.text}> Motorista: {item.full_name}</Text>
          <Text style={styles.text}> Veiculo: {item.vehicle_description}</Text>
          <Text style={styles.text}> Placa: {item.plate}</Text>

          <Text> </Text>
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
      <View>
        <Header> CORRIDAS EM ANDAMENTO</Header>
        {!current_race && (
          <Text style={styles.textTitle}> Nenhuma corrida encontrada</Text>
        )}
        {current_race && (
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.date}>
                <Text style={styles.strong}>DATA: </Text>
                {dateFormat(current_race.created_at, 'dd/mm/yyyy  HH:MM:ss')}
              </Text>
            </View>
            <View>
              <View>
                <Text style={styles.text}>
                  <Text style={styles.strong}>DE: </Text>
                  {current_race?.street_origin}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.strong}>PARA: </Text>
                  {current_race?.street_destination}
                </Text>
                <Text> </Text>
                <Text style={styles.text}>
                  <Text style={styles.strong}>Tipo de Veiculo: </Text>
                  {current_race?.vehicle_type === 'motorcycle'
                    ? 'MOTO'
                    : 'CARRO'}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.strong}>Forma de pagamento: </Text>
                  {current_race.payment_type === 'cash' && ' DINHEIRO'}
                  {current_race.payment_type === 'card_credit' &&
                    ' CARTÃO DE CRÉDITO'}
                  {current_race.payment_type === 'card_debit' &&
                    'CARTÃO DE DEBITO'}
                  {current_race.payment_type === 'pix' && ' PIX'}
                </Text>
                <Text> </Text>
                {current_race.status === '2' && (
                  <>
                    <Text style={styles.text}>
                      <Text style={styles.strong}>MOTORISTA: </Text>
                      {current_race.full_name}
                    </Text>
                    <Text style={styles.text}>
                      <Text style={styles.strong}>VEICULO: </Text>
                      {current_race.vehicle_description}
                    </Text>
                    <Text style={styles.text}>
                      <Text style={styles.strong}>COR: </Text>
                      {current_race.color}
                    </Text>
                    <Text style={styles.text}>
                      <Text style={styles.strong}>PLACA: </Text>
                      {current_race.plate}
                    </Text>
                  </>
                )}
              </View>
              <View>
                {current_race.status === '1' ? (
                  <>
                    <Pulse
                      color="#560CCE"
                      numPulses={2}
                      diameter={80}
                      speed={10}
                      duration={60000}
                    />
                    <Text style={{color: '#560CCE', textAlign: 'center'}}>
                      <Text style={styles.strong}>PROCURANDO MOTORISTA </Text>
                    </Text>
                  </>
                ) : (
                  <>
                    <Text> </Text>
                    <Pulse
                      color="#560CCE"
                      numPulses={2}
                      diameter={80}
                      speed={10}
                      duration={60000}
                    />
                    <Text style={{color: '#560CCE', textAlign: 'center'}}>
                      <Text style={styles.strong}>
                        MOTORISTA A CAMINHO AGUARDE NO LOCAL{' '}
                      </Text>
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </View>

      <Header> CORRIDAS FINALIZADAS {races.length}</Header>

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

export default ListRace;
