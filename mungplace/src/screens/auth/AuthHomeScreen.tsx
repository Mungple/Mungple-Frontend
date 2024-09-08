import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  View,
} from 'react-native';
import React from 'react';
import CustomButton from '@/components/common/CustomButton';

export default function AuthHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('@/assets/mungple.png')}
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          label="카카오 로그인하기"
          // onPress={() => navigation.navigate(authNavigations.KAKAO)}
          style={styles.kakaoButtonContainer}
          textStyle={styles.buttonText}
        />
        <CustomButton
          label="네이버 로그인하기"
          // onPress={() => navigation.navigate(authNavigations.NAVER)}
          style={styles.naverButtonContainer}
          textStyle={styles.buttonText}
        />
        <CustomButton
          label="구글 로그인하기"
          // onPress={() => navigation.navigate(authNavigations.GOOGLE)}
          style={styles.googleButtonContainer}
          textStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 30,
  },
  imageContainer: {
    flex: 1.5,
    width: Dimensions.get('screen').width / 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#000000',
  },
  kakaoButtonContainer: {
    backgroundColor: '#FEE503',
  },
  naverButtonContainer: {
    backgroundColor: '#19CE60',
  },
  googleButtonContainer: {
    backgroundColor: '#FFFFFF',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000000',
  },
});
