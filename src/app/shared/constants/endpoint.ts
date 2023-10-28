import { environment } from "src/environments/environment.development";

export const AuthEndpoint = {
  login: `${environment.apiurl}auth/login`,
  register: `${environment.apiurl}auth/register`,
  logout: `${environment.apiurl}auth/logout`
}

export const UserEndpoint = {
  getAllUser: `${environment.apiurl}users`,
}
