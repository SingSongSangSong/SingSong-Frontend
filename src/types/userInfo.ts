type LoginResult = {
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

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type {LoginResult, LoginResponse, Tokens};
