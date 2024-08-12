import { User } from "./modelsTypes";

export interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
