import React from 'react';
import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '@/navigations/tap/MainTabNavigator';
import {NavigationContainer} from '@react-navigation/native';

export default function RootNavigator() {
  const isLogin = true;

  return (
    <NavigationContainer>
      {isLogin ? <MainTabNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
