import axiosInstance from '@/api/axios';

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

const kakaoLogin = async (token: string): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/oauth/kakao', {token});

  return data;
};

const naverLogin = async (token: string): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/oauth/naver', {token});

  return data;
};

const googleLogin = async (token: string): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/oauth/google', {token});

  return data;
};

export {
  kakaoLogin,
  naverLogin,
  googleLogin,
}
export type {
  ResponseToken,
}