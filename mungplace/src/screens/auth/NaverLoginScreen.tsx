import React, {useState} from 'react';
import {View, Button, Text} from 'react-native';
import NaverLogin from '@/api/naverLogin';
import {NaverLoginResponse} from '@/api';

export default function NaverLoginScreen() {
  const [loginResponse, setLoginResponse] = useState<NaverLoginResponse | null>(
    null,
  );

  // 로그인 버튼 클릭 시 호출되는 함수
  const handleLogin = async () => {
    try {
      const response = await NaverLogin.login();
      setLoginResponse(response);
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="네이버 로그인" onPress={handleLogin} />

      {loginResponse && loginResponse.isSuccess ? (
        <View style={{marginTop: 20}}>
          <Text>
            Access Token: {loginResponse.successResponse?.accessToken}
          </Text>
          <Text>Token Type: {loginResponse.successResponse?.tokenType}</Text>
        </View>
      ) : (
        loginResponse && (
          <View style={{marginTop: 20}}>
            <Text>로그인 실패: {loginResponse.failureResponse?.message}</Text>
          </View>
        )
      )}
    </View>
  );
}
