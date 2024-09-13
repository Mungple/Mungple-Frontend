import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {colors, mainNavigations} from '@/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MapScreen from '@/screens/map/MapScreen';
import HomeScreen from '@/screens/home/HomeScreen';
import MyPageScreen from '@/screens/user/MyPageScreen';
import RecordScreen from '@/screens/record/RecordScreen';
import RankingScreen from '@/screens/ranking/RankingScreen';

type MainTabParamList = {
  [mainNavigations.HOME]: undefined;
  [mainNavigations.MAP]: undefined;
  [mainNavigations.RECORD]: undefined;
  [mainNavigations.RANKING]: undefined;
  [mainNavigations.MYPAGE]: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabBarIcons(route: RouteProp<MainTabParamList>, focused: boolean) {
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME: {
      iconName = focused ? 'home' : 'home-outline';
      break;
    }
    case mainNavigations.MAP: {
      iconName = focused ? 'map' : 'map-outline';
      break;
    }
    case mainNavigations.RECORD: {
      iconName = focused ? 'document-text' : 'document-text-outline';
      break;
    }
    case mainNavigations.RANKING: {
      iconName = focused ? 'trophy' : 'trophy-outline';
      break;
    }
    case mainNavigations.MYPAGE: {
      iconName = focused ? 'person' : 'person-outline';
      break;
    }
  }

  return (
    <Ionicons
      name={iconName}
      color={focused ? colors.BLUE_500 : colors.BLACK}
      size={30}
    />
  );
}

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: colors.GRAY_200,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        headerShown: false,
        tabBarIcon: ({focused}) => TabBarIcons(route, focused),
      })}>
      <Tab.Screen
        name={mainNavigations.HOME}
        component={HomeScreen}
        options={{title: '홈'}}
      />
      <Tab.Screen
        name={mainNavigations.MAP}
        component={MapScreen}
        options={{title: '지도'}}
      />
      <Tab.Screen
        name={mainNavigations.RECORD}
        component={RecordScreen}
        options={{title: '기록'}}
      />
      <Tab.Screen
        name={mainNavigations.RANKING}
        component={RankingScreen}
        options={{title: '랭킹'}}
      />
      <Tab.Screen
        name={mainNavigations.MYPAGE}
        component={MyPageScreen}
        options={{title: '내정보'}}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
