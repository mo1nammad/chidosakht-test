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
  email: string | null;
};

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export type Role = {
  id: string;
  name: string;
  description: string;
  links: {
    url: string;
    for: string;
    httpMethod: string;
  }[];
};

export type Permission = {
  id: number;
  area: string;
  controller: string;
  action: string;
  description: string;
};
