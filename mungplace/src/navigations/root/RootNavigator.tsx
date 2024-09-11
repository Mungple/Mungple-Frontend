import React from 'react';
import {useAppStore} from '@/state/useAppStore';
import {NavigationContainer} from '@react-navigation/native';

import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainTabNavigator from '@/navigations/tap/MainTabNavigator';
import WalkingStackNavigator from '../stack/WalkingStackNavigator';

const RootNavigator: React.FC = () => {
  let navigatorToShow: JSX.Element;
  const isLogin = useAppStore((state) => state.isLogin);
  const walkingStart = useAppStore(state => state.walkingStart);

  if (walkingStart) {
    navigatorToShow = <WalkingStackNavigator />;
  } else if (isLogin) {
    navigatorToShow = <MainTabNavigator />;
  } else {
    navigatorToShow = <AuthStackNavigator />;
  }

  return (
    <NavigationContainer>
      {navigatorToShow}
    </NavigationContainer>
  );
};

export default RootNavigator;
