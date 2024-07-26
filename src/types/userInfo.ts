type LoginResult = {
  accessToken: string;
  accessTokenExpiresAt: number;
  accessTokenExpiresIn: number;
  idToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: number;
  refreshTokenExpiresIn: number;
  scopes: string[];
  tokenType: string;
};
export type {LoginResult};
