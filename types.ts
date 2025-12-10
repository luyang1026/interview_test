export enum Gender {
  Male = 'male',
  Female = 'female',
}

export enum IDType {
  IdentityCard = 'identity_card',
  Passport = 'passport',
  HomeReturnPermit = 'home_return_permit', // 港澳台
}

export interface UserFormData {
  fullName: string;
  idType: IDType;
  idNumber: string;
  birthday: string;
  gender: Gender | '';
  phoneNumber: string;
  verificationCode: string;
}

export enum AppStep {
  PersonalInfo = 1,
  PhoneVerification = 2,
  Success = 3,
}

export const ID_TYPE_LABELS: Record<IDType, string> = {
  [IDType.IdentityCard]: '居民身份证',
  [IDType.Passport]: '护照',
  [IDType.HomeReturnPermit]: '港澳台通行证',
};
