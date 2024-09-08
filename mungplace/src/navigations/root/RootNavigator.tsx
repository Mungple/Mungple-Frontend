import React from 'react';
import MainTabNavigator from '@/navigations/tap/MainTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '@/screens/auth/LoginScreen';

export default function RootNavigator() {
  const isLogin = false;

  return (
    <NavigationContainer>
      {isLogin ? <MainTabNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
}
