import React, {createContext, useState, useEffect} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {View, ActivityIndicator} from 'react-native';

import api from '../services/api';
const jwtDecode = require('jwt-decode');

// define o tipo do contexto semelhante ao typescript
const AuthContex = createContext({
  signed: Boolean,
  token: String,
  user: Object,
  signIn: Function,
  signOut: Function,
  Loading: Boolean,
  error_login: String,
  setErrorLogin: Function,
  user_name: String,
  setUser: Function,
});

// atribui valor do contexto dentro do componente de contexto
export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error_login, setErrorLogin] = useState('');
  const [user_name, setUserName] = useState({});

  useEffect(() => {
    async function loadDateStorage() {
      setLoading(true);

      const userAuth = await AsyncStorage.getItem('@entrega:user');
      const token = await AsyncStorage.getItem('@entrega:token');

      if (userAuth && token) {
        api.defaults.headers.authorization = ` ${token}`;
        setUser(JSON.parse(userAuth));
      }
      setLoading(false);
      setErrorLogin(null);
    }

    loadDateStorage();
  }, []);

  async function signIn(username, password) {
    console.log(username, password);
    try {
      setLoading(true);
      const response = await api.post('/sign-in', {
        username,
        password,
      });
      const {token} = response.data;
      if (token) {
        // eslint-disable-next-line no-shadow
        const user = jwtDecode(token);
        setUser(user.data);
        setUserName('');
        setErrorLogin(null);
        api.defaults.headers.authorization = ` ${token}`;
        await AsyncStorage.setItem('@entrega:user', JSON.stringify(user.data));
        await AsyncStorage.setItem('@entrega:token', token);
      } else {
        // console.log(response.data)
        setUserName(username);
        setErrorLogin('error');
      }

      setLoading(false);
    } catch (err) {
      setErrorLogin('error');
      console.log(err);
      setLoading(false);
    }
  }

  async function signOut() {
    const token = await AsyncStorage.getItem('@tokenNotif');
    AsyncStorage.clear().then(() => {
      setUser(null);
    });

    await api.delete(`/devices/${token}`);
    setErrorLogin(null);
  }

  //if (loading) {
  //  return (
  //    // eslint-disable-next-line react-native/no-inline-styles
  //    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //      <ActivityIndicator size="large" color="#333" />
  //    </View>
  //  );
  //}

  return (
    // se existir user return true signed
    <AuthContex.Provider
      value={{
        signed: !!user,
        user,
        signIn,
        setUser,
        signOut,
        error_login,
        setErrorLogin,
        user_name,
      }}>
      {children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
