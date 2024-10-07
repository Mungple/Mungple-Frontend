import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import mungplelogo from '@/assets/mungple_logo_no_text.png'
import mungplebottom from '@/assets/mungple_logo_bottom.png'
import CustomText from '@/components/common/CustomText';


const SplashScreen = () => {
  const navigation = useNavigation()
  const logoAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('AuthHome'); // 'Main'은 메인 화면의 이름입니다. 적절하게 변경하세요.
        }, 3000);

        Animated.loop(
            Animated.sequence([
              Animated.timing(logoAnim, {
                toValue: 1, // 오른쪽으로 이동
                duration: 1000,
                useNativeDriver: true,
              }),
              Animated.timing(logoAnim, {
                toValue: 0, // 원래 위치로 돌아옴
                duration: 1000,
                useNativeDriver: true,
              }),
            ]),
          ).start();

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
    }, [navigation]);

    const logoInterpolate = logoAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-20, 10], 
      });

    return (
        <View style={styles.container}>
            <CustomText fontSize={40} fontWeight="bold">
              멍플
            </CustomText>
            <CustomText fontSize={30} color='gray'>
              반려견과 만드는 소중한 흔적
            </CustomText>
            <Animated.Image
                source={mungplelogo} // 로고 이미지 경로
                style={[styles.logo_top, { transform: [{ translateY: logoInterpolate }] }]}
            />
            <Image
                source={mungplebottom}
                style={[styles.logo_bottom]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // 배경색
    },
    logo_top: {
        marginTop: 50,
        width: 300, // 로고 너비
        height: 300, // 로고 높이
        resizeMode: 'contain',
    },
    logo_bottom: {
        width: 300, // 로고 너비
        height: 200, // 로고 높이
        resizeMode: 'contain',
    },
});

export default SplashScreen;