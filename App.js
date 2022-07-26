import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import Routes from './src/routes';
import {AuthProvider} from './src/contexs/auth';
import Toast from 'react-native-toast-message';

StatusBar.setBarStyle('default');
const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
};

export default App;
