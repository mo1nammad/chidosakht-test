import { InternalAxiosRequestConfig } from "axios";

export type RefreshTokenApiResponse = {
  token: string;
  tokenExpireTime: string;
  refreshToken: string;
  refreshTokenExpireTime: string;
};

export type Session = {
  id: string;
  phoneNumber: string;
  fullName: string;
  email: string;
};

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
