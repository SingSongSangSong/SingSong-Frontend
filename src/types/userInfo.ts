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

type ProfileResult = {
  id: number;
  email: string;
  name: string;
  nickname: string;
  profileImageUrl: string;
  thumbnailImageUrl: string;
  phoneNumber: string;
  ageRange: string;
  birthday: string;
  birthdayType: string;
  birthyear: string;
  gender: string;
  isEmailValid: boolean;
  isEmailVerified: boolean;
  isKorean: boolean;
  ageRangeNeedsAgreement?: boolean;
  birthdayNeedsAgreement?: boolean;
  birthyearNeedsAgreement?: boolean;
  emailNeedsAgreement?: boolean;
  genderNeedsAgreement?: boolean;
  isKoreanNeedsAgreement?: boolean;
  phoneNumberNeedsAgreement?: boolean;
  profileNeedsAgreement?: boolean;
  ciNeedsAgreement?: boolean;
  nameNeedsAgreement?: boolean;
  profileImageNeedsAgreement?: boolean;
  profileNicknameNeedsAgreement?: boolean;
  legalBirthDateNeedsAgreement?: boolean;
};

type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
};

type LoginV2Response = {
  data: {
    accessToken: string;
    isInfoRequired: boolean;
    refreshToken: string;
  };
  message: string;
};

type MemberInfo = {
  birthYear?: number;
  email?: string;
  gender?: string;
  nickname?: string;
};

type MemberInfoResponse = {
  data: MemberInfo;
  message: string;
};

type DefaultResponse = {
  data: string;
  message: string;
};

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type {
  LoginResult,
  ProfileResult,
  LoginResponse,
  MemberInfo,
  MemberInfoResponse,
  Tokens,
  DefaultResponse,
  LoginV2Response,
};
