import React from 'react';
import {walkingNavigations} from '@/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '@/screens/home/HomeScreen';
import WalkingScreen from '@/screens/walking/WalkingScreen';

export type MapStackParamList = {
  [walkingNavigations.HOME]: undefined;
  [walkingNavigations.WALKING]: undefined;
};

const Stack = createNativeStackNavigator<MapStackParamList>();

const MapStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: ' ',
        headerShown: false,
      }}>
      <Stack.Screen name={walkingNavigations.HOME} component={HomeScreen} />
      <Stack.Screen name={walkingNavigations.WALKING} component={WalkingScreen}/>
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
