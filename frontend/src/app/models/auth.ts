export type AuthType = 'login' | 'register';

export interface AuthDTO {
  name?: string;
  username: string;
  password: string;
}
