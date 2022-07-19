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
    const response = await api.get('/races');
    const {data} = response;

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
             Tipo de Veiculo:{' '}
            {item.type_vehicle === 'motorcycle' ? 'Moto' : 'Carro'}
          </Text>
          <Text style={styles.text}> Motorista: {item.full_name}</Text>
          <Text style={styles.text}> Veiculo: {item.vehicle_description}</Text>
          <Text style={styles.text}> Placa: {item.plate}</Text>
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
                DATA: {dateFormat(current_race?.date, 'dd/mm/yyyy')}{' '}
              </Text>
            </View>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View> 
                <Text style={styles.text}>
                  {' '}
                  De: {current_race?.street_origin}
                </Text>
                <Text style={styles.text}>
                  {' '}
                  Para: {current_race?.street_destination}
                </Text>
                <Text style={styles.text}>
                  Tipo de Veiculo:{' '}
                  {current_race?.type_vehicle === 'motorcycle'
                    ? 'Moto'
                    : 'Carro'}
                </Text>

                {current_race.status === '2' && (
                  <>
                    <Text style={styles.text}>
                      Motorista: {current_race.full_name}
                    </Text>
                    <Text style={styles.text}>
                      Veiculo: {current_race.vehicle_description}
                    </Text>
                    <Text style={styles.text}>Placa: {current_race.plate}</Text>
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
                    <Text style={{color: '#560CCE'}}>
                      {' '}
                      procurando motorista
                    </Text>
                  </>
                ) : (
                  <>
                    <Pulse
                      color="#560CCE"
                      numPulses={2}
                      diameter={80}
                      speed={10}
                      duration={60000}
                    />
                    <Text style={{color: '#560CCE'}}> Motorista a caminho</Text>
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </View>

      <Header> CORRIDAS FINALIZADAS</Header>

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
