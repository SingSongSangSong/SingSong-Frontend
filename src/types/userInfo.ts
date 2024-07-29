type LoginResult = {
  // accessToken: string;
  // accessTokenExpiresAt: number;
  // accessTokenExpiresIn: number;
  // idToken: string;
  // refreshToken: string;
  // refreshTokenExpiresAt: number;
  // refreshTokenExpiresIn: number;
  // scopes: string[];
  // tokenType: string;

  accessToken: string;
  refreshToken: string;
  tokenType?: string;
  idToken?: string;
  accessTokenExpiresAt: number; // unix
  refreshTokenExpiresAt: number; // unix
  accessTokenExpiresIn: number; // seconds
  refreshTokenExpiresIn: number; // seconds
  scopes: string[];
};

type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
};

export type {LoginResult, LoginResponse};
