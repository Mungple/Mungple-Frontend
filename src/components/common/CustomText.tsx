import React from 'react';
import styled from 'styled-components/native';
import { Text, TextProps } from 'react-native';
import { colors } from '@/constants';

type CustomTextProps = TextProps & {
  fontWeight?: 'bold' | 'regular'; // bold 또는 regular 속성
  fontSize?: number; // 폰트 사이즈
  color?: string; // 폰트 색상
};

const CustomText: React.FC<CustomTextProps> = ({
  fontWeight = 'regular',
  fontSize,
  color,
  children,
  ...props
}) => {
  return (
    <StyledText fontWeight={fontWeight} fontSize={fontSize} color={color} {...props}>
      {children}
    </StyledText>
  );
};

const StyledText = styled(Text)<{
  fontWeight: 'bold' | 'regular';
  fontSize?: number;
  color?: string;
}>`
  font-family: ${({ fontWeight }) =>
    fontWeight === 'bold' ? 'OTLaundryGothicB' : 'OTLaundryGothicR'};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
  color: ${({ color }) => (color ? color : colors.BLACK)};
`;

export default CustomText;
