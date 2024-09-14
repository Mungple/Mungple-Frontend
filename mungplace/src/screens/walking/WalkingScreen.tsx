import React, {useState} from 'react';
import {Dimensions, Text} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';

import {useAppStore} from '@/state/useAppStore';
import {colors, mapNavigations} from '@/constants';
import useUserLocation from '@/hooks/useUserLocation';
import CustomCard from '@/components/common/CustomCard';
import MapComponent from '@/components/map/MapComponent';
import ElapsedTime from '@/components/walking/ElapsedTime';
import CustomButton from '@/components/common/CustomButton';
import CustomModal from '@/components/common/CustomModal';

const bottomBlockHeight = (Dimensions.get('window').height * 1) / 5;
const bottomBlockWidth = Dimensions.get('window').width - 40;

const WalkingScreen = () => {
  const {userLocation} = useUserLocation();
  const [distance, setDistance] = useState(0);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setWalkingStart = useAppStore(state => state.setWalkingStart);

  const navigation =
    useNavigation<NativeStackNavigationProp<MapStackParamList>>();

  const handleWalkingEnd = () => {
    setIsModalVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  const handleAddMarker = (markerData: any) => {
    console.log('Adding Marker:', markerData);
  };

  const confirmEndWalking = () => {
    setWalkingStart(false);
    setIsModalVisible(false);
    navigation.navigate(mapNavigations.HOME);
  };

  const cancelEndWalking = () => {
    setIsModalVisible(false);
  };

  return (
    <Container>
      {userLocation && (
        <>
          <MapComponent
            userLocation={userLocation}
            isFormVisible={isFormVisible}
            onFormClose={handleFormClose}
            onAddMarker={handleAddMarker}
            bottomOffset={bottomBlockHeight + 20}
          />

          {/* 하단 상태 정보 */}
          <BottomCard height={bottomBlockHeight} width={bottomBlockWidth}>
            <WalkingInfo>
              <InfoRow>
                <InfoBlock>
                  <InfoLabel>소요 시간</InfoLabel>
                  <ElapsedTime />
                </InfoBlock>
                <InfoBlock>
                  <InfoLabel>이동 거리</InfoLabel>
                  <InfoValue>{distance.toFixed(1)} km</InfoValue>
                </InfoBlock>
              </InfoRow>
            </WalkingInfo>
            <CustomButton label="산책 종료하기" onPress={handleWalkingEnd} />
          </BottomCard>

          {/* 산책 종료 확인 모달 */}
          <CustomModal modalVisible={isModalVisible}>
            <Icon name="alert-circle-outline" size={48} color="#f00" />
            <ModalTitle>산책을 종료하시겠습니까?</ModalTitle>
            <ButtonContainer>
              <ConfirmButton label="확인" onPress={confirmEndWalking} />
              <CancelButton label="취소" onPress={cancelEndWalking} />
            </ButtonContainer>
          </CustomModal>

        </>
      )}
    </Container>
  );
};

const ModalTitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`;

const ConfirmButton = styled(CustomButton)`
  margin-right: 20px;
  width: ${bottomBlockWidth / 2 - 30}px;
`;

const CancelButton = styled(CustomButton)`
  background-color: ${colors.GRAY_300};
  width: ${bottomBlockWidth / 2 - 30}px;
`;

const Container = styled.View`
  flex: 1;
`;

const BottomCard = styled(CustomCard)<{height: number; width: number}>`
  position: absolute;
  bottom: 0;
  height: ${({height}) => `${height}px`};
  width: ${({width}) => `${width}px`};
  margin-right: 20px;
  padding: 20px;
`;

const WalkingInfo = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const InfoBlock = styled.View`
  flex: 1;
  align-items: center;
`;

const InfoLabel = styled(Text)`
  font-size: 18px;
  color: #999999;
`;

const InfoValue = styled(Text)`
  font-size: 32px;
  font-weight: bold;
  color: #000000;
`;

export default WalkingScreen;
