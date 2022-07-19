import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Client/Home';
import CreateRace from '../screens/Client/CreateRace';
import Profile from '../screens/Client/Profile';
import EditPassword from '../screens/Client/Profile/EditPassword';
import EditPersonalData from '../screens/Client/Profile/EditPersonalData';
import ListRace from '../screens/Client/ListRace';
const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: false,
          title: 'MotoTaxi',
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CreateRace" component={CreateRace} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditPassword" component={EditPassword} />
        <Stack.Screen name="EditPersonalData" component={EditPersonalData} />
        <Stack.Screen name="ListRace" component={ListRace} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
