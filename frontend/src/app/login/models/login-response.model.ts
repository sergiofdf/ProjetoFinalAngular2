import { User } from "src/app/cadastro-dados/models/user.model";

export interface LoginResponse {
  user: string;
  token: string;
}
