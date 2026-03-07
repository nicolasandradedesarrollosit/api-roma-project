export interface IAuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  token: string;
}

export interface ITokenPayload {
  userId: string;
  email: string;
  role: string;
}
