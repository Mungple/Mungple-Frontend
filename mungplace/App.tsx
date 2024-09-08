import React from 'react';
import queryClient from './src/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar />
    </QueryClientProvider>
  )
}


export default App;
