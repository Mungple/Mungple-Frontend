import React from 'react';
import MainTabNavigator from '@/navigations/tap/MainTabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';

export default function RootNavigator() {
  const isLogin = false;

  return (
    <NavigationContainer>
      {isLogin ? <MainTabNavigator /> : <AuthHomeScreen />}
    </NavigationContainer>
  );
}
