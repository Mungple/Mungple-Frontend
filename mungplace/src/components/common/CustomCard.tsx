import React from 'react';
import styled from 'styled-components/native';
import {ViewStyle, StyleProp, TextStyle, View} from 'react-native';

// 카드 컴포넌트의 props 타입을 정의하는 인터페이스
interface CustomCardProps {
  title?: string; // 카드의 제목
  description?: string; // 카드의 설명
  style?: StyleProp<ViewStyle>; // 사용자 지정 스타일
  titleStyle?: StyleProp<TextStyle>; // 제목의 사용자 지정 텍스트 스타일
  descriptionStyle?: StyleProp<TextStyle>; // 설명의 사용자 지정 텍스트 스타일
  children?: React.ReactNode; // 카드 내부에 추가할 컴포넌트나 요소들
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  style,
  titleStyle,
  descriptionStyle,
  children,
}) => {
  return (
    <CardContainer style={style}>
      <Title style={titleStyle}>{title}</Title>
      <Description style={descriptionStyle}>{description}</Description>
      {children && <View>{children}</View>}
    </CardContainer>
  );
};

// 기본 스타일을 가진 CardContainer
const CardContainer = styled.View`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 20px;
  max-width: 400px;
  margin: 20px;
  width: 100%;
`;

// 기본 스타일을 가진 Title
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

// 기본 스타일을 가진 Description
const Description = styled.Text`
  font-size: 16px;
  color: #666;
  line-height: 24px;
  margin-bottom: 20px;
`;

export default CustomCard;
