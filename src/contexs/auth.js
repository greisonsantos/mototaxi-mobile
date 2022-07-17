import React, { createContext, useState, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import { View, ActivityIndicator } from 'react-native';

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
  error_login:Object,
  user_name: String
});

// atribui valor do contexto dentro do componente de contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error_login, setErrorLogin]=useState({});
  const [user_name, setUserName]=useState({});

  
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
      setErrorLogin({});
    }

    loadDateStorage();
  }, []);

  async function signIn(username, password) {


    try{
      setLoading(true);
      const response= await api.post('/sign-in',{
          username,
          password
      })
      
    
      const { token }= response.data;
      
      if(!!token){
        const user= jwtDecode(token);
      
        setUser(user.data)
        setUserName('')
        setErrorLogin('')
    
        api.defaults.headers.authorization = ` ${token}`;
        await AsyncStorage.setItem('@entrega:user', JSON.stringify(user.data));
        await AsyncStorage.setItem('@entrega:token', token);
      }else{
        // console.log(response.data)
        setUserName(username)
        setErrorLogin(response.data)
      }

      setLoading(false);
    }catch(err){
      console.log(err)
      setLoading(false);
    }

  }

  async function signOut() {
   
    const token= await AsyncStorage.getItem('@tokenNotif');
    AsyncStorage.clear().then(() => {
      setUser(null);
    });

    await api.delete(`/devices/${token}`)
    setErrorLogin({});

  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    // se existir user return true signed
    <AuthContex.Provider value={{ signed: !!user, user, signIn, signOut, error_login,user_name }}>
      {children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
