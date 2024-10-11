import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, numbers } from '@/constants';
import CustomText from '@/components/common/CustomText';

type MonthSelectorProps = {
  isVisible: boolean;
  currentmonth: number;
  onChangeMonth: (month: number) => void;
  hide: () => void;
};

const months = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

function MonthSelector({ isVisible, currentmonth, onChangeMonth, hide }: MonthSelectorProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const scrollToY = (currentmonth - 1) * 50; // -1을 추가하여 인덱스와 일치하도록
    setScrollY(scrollToY);
  }, [isVisible, currentmonth]);

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade" onRequestClose={hide}>
      <Container>
        <MonthsContainer>
          <FlatList
            contentContainerStyle={{ alignItems: 'center' }}
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentOffset={{ x: 0, y: scrollY }}
            data={months.map((month, index) => ({ id: index, month }))}
            renderItem={({ item }) => (
              <MonthButton
                key={item.id}
                onPress={() => onChangeMonth(item.id)}
                selected={currentmonth === item.id + 1}>
                <CustomText
                  fontWeight={currentmonth === item.id + 1 ? 'bold' : 'regular'}
                  color={currentmonth === item.id + 1 ? colors.WHITE : colors.BLACK}>
                  {item.month}
                </CustomText>
              </MonthButton>
            )}
            keyExtractor={(item) => String(item.id)}
            numColumns={numbers.CALENDAR_SELECTOR_COLUMN}
          />
          <CloseButton onPress={hide}>
            <CustomText fontWeight="bold" fontSize={16} style={{ marginRight: 10 }}>
              닫기
            </CustomText>
            <MaterialIcons name="keyboard-arrow-up" size={20} />
          </CloseButton>
        </MonthsContainer>
      </Container>
    </Modal>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MonthsContainer = styled.View`
  width: 90%;
  max-height: 400px;
  background-color: ${colors.WHITE};
  border-radius: 10px;
  padding: 20px;
`;

const MonthButton = styled.Pressable<{ selected: boolean }>`
  width: 80px;
  height: 40px;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? colors.ORANGE.BASE : 'transparent')};
`;

const CloseButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-top-width: 1px;
  border-top-color: ${colors.GRAY_200};
  background-color: ${colors.WHITE};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-top: 15px;
`;

const styles = StyleSheet.create({
  scrollContainer: {
    maxHeight: 200,
    backgroundColor: colors.WHITE,
  },
});

export default MonthSelector;
