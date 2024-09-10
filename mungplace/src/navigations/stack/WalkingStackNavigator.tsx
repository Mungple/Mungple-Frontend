import React from 'react';
import {authNavigations} from '@/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '@/screens/home/HomeScreen';
import WalkingScreen from '@/screens/walking/WalkingScreen';

export type WalkingStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.KAKAO]: undefined;
  [authNavigations.NAVER]: undefined;
  [authNavigations.GOOGLE]: undefined;
};

const Stack = createNativeStackNavigator<WalkingStackParamList>();

function WalkingStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={HomeScreen}
        options={{
          headerTitle: ' ',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.KAKAO}
        component={WalkingScreen}
        options={{
          headerTitle: '카카오 로그인',
        }}
      />

    </Stack.Navigator>
  );
}

export default WalkingStackNavigator;
