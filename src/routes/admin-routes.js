import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Home from '../screens/Admin';
const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          title: '',
        }}>
        <Stack.Screen name="HomeAdmin" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
