import axiosInstance from './axios';
import {getEncryptStorage} from '@/utils';
import type {Category, Profile} from '@/types/domain';

// 회원가입 및 로그인 시 사용되는 요청 데이터 타입
type RequestUser = {
  email: string;
  password: string;
};

// 로그인 후 응답받는 토큰 데이터 타입
type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

// 사용자 프로필 및 카테고리 정보를 포함하는 타입
type ResponseProfile = Profile & Category;

// 회원가입 요청 함수
const postSignup = async ({email, password}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {email, password});
  return data;
};

// 로그인 요청 함수
const postLogin = async ({email, password}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {email, password});
  return data;
};

// 카카오 로그인 요청 함수
const kakaoLogin = async (token: string): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/oauth/kakao', {token});
  return data;
};

// 프로필 정보 요청 함수
const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/auth/me');
  return data;
};

// 액세스 토큰 요청 함수
const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {Authorization: `Bearer ${refreshToken}`},
  });
  return data;
};

// 로그아웃 요청 함수
const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export {postSignup, postLogin, getProfile, logout, getAccessToken, kakaoLogin};
export type {RequestUser, ResponseToken, ResponseProfile};
