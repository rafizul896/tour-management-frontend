export interface ISendOtp {
  email: string;
  name: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}
