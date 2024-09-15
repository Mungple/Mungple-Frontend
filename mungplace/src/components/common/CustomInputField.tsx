import React, {ForwardedRef, ReactNode, forwardRef, useRef} from 'react';
import {Dimensions, TextInput, TextInputProps, Pressable} from 'react-native';

import {mergeRefs} from '@/utils';
import {colors} from '@/constants';
import styled from 'styled-components/native';

// 커스텀 입력 필드 props 인터페이스 정의
interface CustomInputFieldProps extends TextInputProps {
  error?: string;     // 에러 메시지
  touched?: boolean;  // 입력 필드가 터치되었는지 여부
  icon?: ReactNode;   // 아이콘 컴포넌트
}

// 디바이스 화면 높이 가져오기
const deviceHeight = Dimensions.get('screen').height;

const CustomInputField = forwardRef(
  (
    {error, touched, icon = null, ...props}: CustomInputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null); // 내부 참조 생성
    const hasError = touched && Boolean(error);      // 에러 여부 확인
    const isEditable = props.editable !== false;     // 편집 가능 여부 확인

    // 입력 필드 클릭 시 포커스 주기
    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      // Pressable로 감싸서 입력 필드 외부를 터치해도 포커스되도록 함
      <Pressable onPress={handlePressInput}>
        <Container
          multiline={props.multiline}
          hasError={hasError}
          isEditable={isEditable}
        >
          <InnerContainer hasIcon={Boolean(icon)}>
            {icon}
            <StyledTextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              placeholderTextColor={colors.BLUE.BASE}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              editable={isEditable}
              {...props}
            />
          </InnerContainer>
          {hasError && <ErrorText>{error}</ErrorText>}
        </Container>
      </Pressable>
    );
  },
);

const Container = styled.View<{
  multiline?: boolean;
  hasError?: boolean;
  isEditable?: boolean;
}>`
  border-width: 1px;
  border-radius: 8px;
  border-color: ${props => (props.hasError ? colors.RED.DARKER : colors.GRAY_200)};
  padding: ${deviceHeight > 700 ? 15 : 10}px;
  ${props => props.multiline && `padding-bottom: ${deviceHeight > 700 ? 45 : 30}px`};
  ${props => !props.isEditable && `background-color: ${colors.GRAY_200}`};
`;

const InnerContainer = styled.View<{hasIcon?: boolean}>`
  ${props => props.hasIcon && `
    gap: 5px;
    flex-direction: row;
    align-items: center;
  `}
`;

const StyledTextInput = styled(TextInput).attrs<{isEditable?: boolean}>(
  props => ({editable: props.editable}),
)<{isEditable?: boolean}>`
  padding: 0;
  font-size: 16px;
  color: ${colors.BLACK};
  ${props => !props.editable && `
    background-color: ${colors.GRAY_200};
    color: ${colors.BLUE.LIGHTER};
  `}
`;

const ErrorText = styled.Text`
  font-size: 12px;
  padding-top: 5px;
  color: ${colors.RED.DARKER};
`;

export default CustomInputField;
