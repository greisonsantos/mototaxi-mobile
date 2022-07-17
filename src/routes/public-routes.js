import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import StartScreen from '../screens/Public/StartScreen';
import LoginScreen from '../screens/Public/LoginScreen';
import RegisterScreen from '../screens/Public/RegisterScreen';
import ResetPasswordScreen from '../screens/Public/ResetPasswordScreen';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          title: '',
        }}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
