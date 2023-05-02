export interface LoginResponseDTO {
  authCode: string;
  message: string;
  autoLoginSeries: any;
  autoLoginToken: any;
  custId: number;
  email: string;
  ssoCookieDomain: string;
  ssoCookieName: string;
  ssoCookiePath: string;
  ssoCookieValue: string;
}
