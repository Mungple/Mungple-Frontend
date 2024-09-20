import React from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useForm from '@/hooks/useForm';
import useModal from '@/hooks/useModal';
import {validateInputUser} from '@/utils';
import useAuth from '@/hooks/queries/useAuth';
import useImagePicker from '@/hooks/useImagePicker';
import {authNavigations, colors} from '@/constants';
import CustomButton from '@/components/common/CustomButton';
import CustomInputField from '@/components/common/CustomInputField';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import EditProfileImageOption from '@/components/setting/EditProfileImageOption';

type PostProfileScreenProps = NativeStackScreenProps<AuthStackParamList>;

const EditProfileScreen = ({navigation}: PostProfileScreenProps) => {
  const imageOption = useModal();
  const {getProfileQuery} = useAuth();
  const {nickname, imageUri} = getProfileQuery.data || {};

  // 이미지 선택 기능을 위한 커스텀 훅
  const imagePicker = useImagePicker({
    initialImages: imageUri ? [{uri: imageUri}] : [],
    mode: 'single',
    onSettled: imageOption.hide,
  });

  // 닉네임 수정 폼을 위한 훅
  const editProfile = useForm({
    initialValue: {nickname: nickname ?? ''},
    validate: validateInputUser,
  });

  // 프로필 이미지 클릭 시 모달을 열고 키보드를 숨김
  const handlePressImage = () => {
    imageOption.show();
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    navigation.navigate(authNavigations.POST_PROFILE_PET)
  };

  return (
    <Container>
      {/* 프로필 이미지 영역 */}
      <ProfileContainer>
        <ImageContainer onPress={handlePressImage}>
          {/* 이미지가 없을 때 기본 아이콘 표시 */}
          {imagePicker.imageUris.length === 0 && (
            <Ionicons name="camera-outline" size={40} color={colors.GRAY_400} />
          )}
          {/* 이미지가 있을 때 해당 이미지 표시 */}
          {imagePicker.imageUris.length > 0 && (
            <MyImage source={{uri: `http://10.0.2.2:3030/${imagePicker.imageUris[0]?.uri}`}} resizeMode="cover" />
          )}
        </ImageContainer>
      </ProfileContainer>
      
      {/* 닉네임 입력 필드 */}
      <CustomInputField
        {...editProfile.getTextInputProps('nickname')}
        error={editProfile.errors.nickname}
        touched={editProfile.touched.nickname}
        placeholder="닉네임을 입력해주세요."
      />

      {/* 제출 버튼 */}
      <SubmitButton label='완료' onPress={handleSubmit} />

      {/* 프로필 이미지 수정 모달 옵션 */}
      <EditProfileImageOption
        isVisible={imageOption.isVisible}        // 모달이 보이는지 여부
        hideOption={imageOption.hide}            // 모달 숨기기 함수
        onChangeImage={imagePicker.handleChange} // 이미지 선택 후 동작 함수
      />
    </Container>
  );
}

const Container = styled.SafeAreaView`
  flex: 1;
  padding: 20px;
  justify-content: center;
`;

const ProfileContainer = styled.View`
  align-items: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const MyImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;

const ImageContainer = styled.Pressable`
width: 150px;
height: 150px;
border-radius: 75px;
justify-content: center;
align-items: center;
border-color: ${colors.GRAY_300};
border-width: 1px;
`;

const SubmitButton = styled(CustomButton)`
  margin-top: 20px;
`;

export default EditProfileScreen;
