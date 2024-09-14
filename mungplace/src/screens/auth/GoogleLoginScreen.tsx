import React from 'react';
import { Button, View } from 'react-native';
import { useAppStore } from '@/state/useAppStore';

const GoogleLoginScreen: React.FC = () => {
  const setLogin = useAppStore((state) => state.setLogin);

  return (
    <View>
      <Button title="Login" onPress={() => setLogin(true)} />
    </View>
  );
};

export default GoogleLoginScreen;
