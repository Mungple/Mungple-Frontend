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

      <View>
        <CustomButton
          label="카카오 로그인하기"
          // onPress={() => navigation.navigate(authNavigations.KAKAO)}
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          // icon={
          //   <Ionicons name={'chatbubble-sharp'} color={'#181500'} size={16} />
          // }
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
  kakaoButtonContainer: {
    backgroundColor: '#FEE503',
  },
  kakaoButtonText: {
    color: '#000000',
  },
});
