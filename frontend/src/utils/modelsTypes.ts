export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
  isOwner: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
