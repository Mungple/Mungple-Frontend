import React from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {colors} from '@/constants';
import useForm from '@/hooks/useForm';
import {Keyboard, KeyboardAvoidingView, Text} from 'react-native';
import {createPetProfile, editPetProfile} from '@/api';
import useModal from '@/hooks/useModal';
import useImagePicker from '@/hooks/useImagePicker';
import CustomButton from '@/components/common/CustomButton';
import CustomInputField from '@/components/common/CustomInputField';
import EditProfileImageOption from '@/components/setting/EditProfileImageOption';
import RadioButtonGroup from '../common/RadioButtonGroup';
import {validateInputPet} from '@/utils';
import {ResponsePetProfile} from '@/types';

type CreatePetProps = {
  setModalVisible: (visible: boolean) => void;
  isEdit?: boolean;
  petData?: Partial<ResponsePetProfile>;
}

const CreatePet = ({setModalVisible, isEdit = false, petData}: CreatePetProps) => {
  const imageOption = useModal();
  const inputUser = useForm({
    initialValue: {
      petName: petData?.name || '',
      petGender: petData?.gender || 'MALE',
      petWeight: petData?.weight || 0,
      petBirth: petData?.birth || '',
    },
    validate: validateInputPet,
  })

  // 이미지 선택 기능을 위한 커스텀 훅
  const imagePicker = useImagePicker({
    initialImages: [],
    mode: 'single',
    onSettled: imageOption.hide,
  });

  // 프로필 이미지 클릭 시 모달을 열고 키보드를 숨김
  const handlePressImage = () => {
    imageOption.show();
    Keyboard.dismiss();
  };

  const handleRadioChange = (value: string) => {
    inputUser.handleChangeText('petGender', value);
  };

  const handleSubmit = () => {
    const submitData = JSON.stringify({
      ...inputUser.values,
      petWeight: Number(inputUser.values.petWeight),
    });
    if (isEdit && petData?.id) {
      editPetProfile(petData.id, submitData)
    } else {
      createPetProfile(submitData);
    }
    setModalVisible(false)
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1}} 
        behavior='height'>
        {/* 프로필 이미지 영역 */}
        <ProfileContainer>
          <ImageContainer onPress={handlePressImage}>
            {/* 이미지가 없을 때 기본 아이콘 표시 */}
            {imagePicker.imageNames.length === 0 && (
              <Ionicons name="camera-outline" size={40} color={colors.GRAY_400} />
            )}
            {/* 이미지가 있을 때 해당 이미지 표시 */}
            {imagePicker.imageNames.length > 0 && (
              <MyImage source={{uri: `http://10.0.2.2:3030/${imagePicker.imageNames[0]?.uri}`}} resizeMode="cover" />
            )}
          </ImageContainer>
        </ProfileContainer>

        <InputContainer>
          <CustomInputField
            placeholder="반려견 이름"
            error={inputUser.errors.petName}
            touched={inputUser.touched.petName}
            {...inputUser.getTextInputProps('petName')}
          />
          <CustomInputField
            placeholder="생년월일"
            error={inputUser.errors.petBirth}
            touched={inputUser.touched.petBirth}
            {...inputUser.getTextInputProps('petBirth')}
          />
          <CustomInputField
            placeholder="몸무게"
            error={inputUser.errors.petWeight}
            touched={inputUser.touched.petWeight}
            inputMode='numeric'
            keyboardType="number-pad"
            {...inputUser.getTextInputProps('petWeight')}
          />
          <RadioButtonGroup
            selected={inputUser.values.petGender}
            onSelected={handleRadioChange}>
            {[
              {label: '남아', key: 'MALE'},
              {label: '여아', key: 'FEMALE'},
            ].map((radio) => (
              <RadioButtonGroup.RadioButtonItem key={radio.key} value={radio.key}>
                <Text>{radio.label}</Text>
              </RadioButtonGroup.RadioButtonItem>
            ))}
          </RadioButtonGroup>
          <CustomButton label="등록 완료" onPress={handleSubmit} />
        </InputContainer>

        {/* 프로필 이미지 수정 모달 옵션 */}
        <EditProfileImageOption
          isVisible={imageOption.isVisible}        // 모달이 보이는지 여부
          hideOption={imageOption.hide}            // 모달 숨기기 함수
          onChangeImage={imagePicker.handleChange} // 이미지 선택 후 동작 함수
        />
      </KeyboardAvoidingView>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  padding: 20px;
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

const InputContainer = styled.View`
  gap: 20px;
`;

export default CreatePet;
