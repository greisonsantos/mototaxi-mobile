import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Pulse from 'react-native-pulse';

import Header from '../../../components/Header';
import api from '../../../services/api';
import dateFormat from 'dateformat';

import styles from './styles';
import Button from '../../../components/Button';
import Toast from 'react-native-simple-toast';
const ListRace = ({navigation}) => {
  const [races, setRaces] = useState([]);

  const [current_race, setCurrentRace] = useState(null);

  const getRaces = async () => {
    const response = await api.get('/users-show-races');
    const {data} = response;

    setCurrentRace(data.current_race);
    setRaces(data.finaly_races);
  };

  useEffect(() => {
    getRaces();
  }, []);

  const handleFinalRace = async () => {
    try {
      await api.put(`/races/${current_race.id}`, {
        status: 3,
      });

      Toast.showWithGravity(
        'Atenção, Sucesso Corrida finalizada',
        Toast.LONG,
        Toast.TOP,
      );
      getRaces();
    } catch (error) {
      console.log(error);
      Toast.showWithGravity(
        'Atenção, Erro ao finalizar Corrida! Verifique sua conexão',
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
            <Text style={styles.strong}>DATA: </Text>
            {dateFormat(item.created_at, 'dd/mm/yyyy  HH:MM:ss')}
          </Text>
        </View>

        <View>
          <Text style={styles.text} numberOfLines={2}>
            <Text style={styles.strong}>DE: </Text>
            {item.street_origin}
          </Text>
          <Text style={styles.text} numberOfLines={2}>
            <Text style={styles.strong}>PARA: </Text>
            {item.street_destination}
          </Text>

          <Text />
          <Text style={styles.text}>
            <Text style={styles.strong}>VEICULO SOLICITADO: </Text>
            {item.vehicle_type === 'motorcycle' ? 'Moto' : 'Carro'}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.strong}>FORMA DE PAGAMENTO </Text>
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

                <Text />

                <Text style={styles.text}>
                  <Text style={styles.strong}>PARA: </Text>
                  {current_race?.street_destination}
                </Text>
                <Text />
                <Text style={styles.text}>
                  <Text style={styles.strong}>TIPO DE VEICULO: </Text>
                  {current_race?.vehicle_type === 'motorcycle'
                    ? 'MOTO'
                    : 'CARRO'}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.strong}>FORMA DE PAGAMENTO </Text>
                  {current_race.payment_type === 'cash' && ' DINHEIRO'}
                  {current_race.payment_type === 'card_credit' &&
                    ' CARTÃO DE CRÉDITO'}
                  {current_race.payment_type === 'card_debit' &&
                    'CARTÃO DE DEBITO'}
                  {current_race.payment_type === 'pix' && ' PIX'}
                </Text>
                <Text> </Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <>
                  <Pulse
                    color="#560CCE"
                    numPulses={2}
                    diameter={80}
                    speed={10}
                    duration={60000}
                  />
                  <Text style={{color: '#560CCE', textAlign: 'center'}}>
                    <Text style={styles.strong}>
                      DIGIRA-SE ATÉ O LOCAL PARA PEGAR O PASSAGEIRO:
                    </Text>
                  </Text>
                </>
              </View>
              <Button mode="contained" onPress={handleFinalRace}>
                Finalizar corrida
              </Button>
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
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default ListRace;
