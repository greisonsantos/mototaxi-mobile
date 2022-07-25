import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import Home from '../screens/Admin/Home';
import HomeDriver from '../screens/Admin/Driver/HomeDriver';
import NewDriver from '../screens/Admin/Driver/NewDriver';
import EditDriver from '../screens/Admin/Driver/EditDriver';
import HomeClient from '../screens/Admin/Client/index';
const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          title: '',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomeDriver" component={HomeDriver} />
        <Stack.Screen name="NewDriver" component={NewDriver} />
        <Stack.Screen name="EditDriver" component={EditDriver} />
        <Stack.Screen name="HomeClient" component={HomeClient} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
