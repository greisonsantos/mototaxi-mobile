import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Driver/Home';
import AvaliableRaces from '../screens/Driver/AvaliableRaces';
import Profile from '../screens/Driver/Profile';
import EditPassword from '../screens/Driver/Profile/EditPassword';
import EditPersonalData from '../screens/Driver/Profile/EditPersonalData';
import ListRace from '../screens/Driver/ListRace';

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
        <Stack.Screen name="AvaliableRaces" component={AvaliableRaces} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditPassword" component={EditPassword} />
        <Stack.Screen name="EditPersonalData" component={EditPersonalData} />
        <Stack.Screen name="ListRace" component={ListRace} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
