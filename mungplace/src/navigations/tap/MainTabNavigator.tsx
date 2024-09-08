import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MapScreen from '@/screens/map/MapScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import MyPageScreen from '@/screens/user/MyPageScreen';
import RecordScreen from '@/screens/record/RecordScreen';
import RankingScreen from '@/screens/ranking/RankingScreen';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="지도" component={MapScreen} />
      <Tab.Screen name="기록" component={RecordScreen} />
      <Tab.Screen name="랭킹" component={RankingScreen} />
      <Tab.Screen name="내정보" component={MyPageScreen} />
    </Tab.Navigator>
  );
}
