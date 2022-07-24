import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import SearchBar from 'react-native-search-bar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ListItem from '../../../../components/ListItem';
import api from '../../../../services/api';
import styles from './styles';

const HomeDriver = props => {
  const [deliverymans, setDeliverymans] = useState([]);
  const [show_alert, setShowAlert] = useState(false);
  const [user_for_edit, setUserForEdit] = useState({});

  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await api.get('/users');

    const {data} = response;
    setDeliverymans(data);
  };

  const handleDelete = async item => {
    setUserForEdit(item);
    setShowAlert(true);
  };

  const submitDelete = async () => {
    const deliveryman_id = user_for_edit.id;
    const res = await api.delete(`/users/${deliveryman_id}`);
    if (res.data) {
      let new_users = deliverymans.filter(function (deliveryman) {
        return deliveryman.id != deliveryman_id;
      });

      props.navigation.navigate('HomeAdmin');
      setDeliverymans(new_users);
    }

    setShowAlert(false);
  };

  const handleEdit = async item => {
    props.navigation.navigate('EditUser', {
      id: item.id,
    });
  };

  const Separator = () => (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, height: 1, backgroundColor: '#000'}} />
  );

  if (deliverymans.length === 0) {
    return (
      // eslint-disable-next-line react-native/no-inline-styles
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={50} color="#333" />
      </View>
    );
  }

  const search = searchText => {
    // eslint-disable-next-line no-shadow
    let filteredData = deliverymans.filter(function (item) {
      // return item.username.includes(searchText);
      return (
        item.username.includes(searchText) ||
        item.username.includes(searchText.toUpperCase()) ||
        item.username.includes(searchText.toLowerCase())
      );
    });
    console.log(filteredData);

    setFilteredData(filteredData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <SearchBar
          placeholder="Pesquisar ..."
          onChangeText={search}
          iconColor="tranparent"
          autoCorrect={false}
        />
      </View>

      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 5,
        }}>
        <Text> </Text>
        <Text>
          {' '}
          TOTAL :{' '}
          {filteredData && filteredData.length > 0
            ? filteredData.length
            : deliverymans.length}
        </Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={true}
        data={
          filteredData && filteredData.length > 0 ? filteredData : deliverymans
        }
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <ListItem
            data={item}
            handleLeft={() => handleEdit(item)}
            handleRight={() => handleDelete(item)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <View style={styles.form}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('NewDeliveryMan');
          }}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <AwesomeAlert
        show={show_alert}
        showProgress={false}
        title="Atenção"
        message="Deseja deletar este usuário?"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Não, cancel"
        confirmText="Sim, delete"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => setShowAlert(false)}
        onConfirmPressed={submitDelete}
      />
    </View>
  );
};

export default HomeDriver;
