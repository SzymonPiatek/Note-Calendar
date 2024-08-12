export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isSuperuser: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
