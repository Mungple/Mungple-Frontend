import React, { useEffect } from 'react';
import { useAppStore } from '@/state/useAppStore';
import { NavigationContainer } from '@react-navigation/native';

import MapStackNavigator from '../stack/MapStackNavigator';
import AuthStackNavigator from '../stack/AuthStackNavigator';

const RootNavigator: React.FC = () => {
  let navigatorToShow: JSX.Element;
  const isLogin = useAppStore((state) => state.isLogin);
  const setLogin = useAppStore((state) => state.setLogin);

  useEffect(() => {
    setLogin(isLogin);
  }, [isLogin, setLogin]);

  if (isLogin) {
    navigatorToShow = <MapStackNavigator />;
  } else {
    navigatorToShow = <AuthStackNavigator />;
  }

  return <NavigationContainer>{navigatorToShow}</NavigationContainer>;
};

export default RootNavigator;
