import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

import {walkingNavigations} from '@/constants';
import {useAppStore} from '@/state/useAppStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MapStackParamList} from '@/navigations/stack/WalkingStackNavigator';

import CustomCard from '@/components/common/CustomCard';
import CustomButton from '@/components/common/CustomButton';

const {height: windowHeight} = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const setWalkingStart = useAppStore(state => state.setWalkingStart);
  const navigation = useNavigation<NativeStackNavigationProp<MapStackParamList>>();

  const handleWalkingStart = () => {
    setWalkingStart(true);
    navigation.navigate(walkingNavigations.WALKING);
  };

  return (
    <Container>
      <StyledCard
        title="사진"
        description="오늘의 산책 목표를 설정해보세요!"
      />
      
      <StyledGoalCard
        title="오늘의 목표"
        description="오늘의 산책 목표를 설정해보세요!"
      />
      
      <StyledButton
        label="산책 시작하기"
        onPress={handleWalkingStart}
      />
    </Container>
  );
};

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2;
`;

const StyledCard = styled(CustomCard).attrs({
  style: {
    backgroundColor: '#f8f9fa',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  titleStyle: {
    color: '#007AFF',
  },
  descriptionStyle: {
    color: '#333',
  },
})`
  height: ${windowHeight * 0.42}px;
`;

const StyledGoalCard = styled(CustomCard).attrs({
  style: {
    backgroundColor: '#f8f9fa',
  },
  titleStyle: {
    color: '#007AFF',
    fontSize: 28,
  },
  descriptionStyle: {
    color: '#333',
    fontSize: 16,
  },
})`
  height: ${windowHeight * 0.3}px;
`;

const StyledButton = styled(CustomButton).attrs({
  style: {
    backgroundColor: '#007AFF',
  },
  textStyle: {
    color: '#fff',
  },
})``;
