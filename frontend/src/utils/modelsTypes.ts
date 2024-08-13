export interface UserType {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  isSuperuser: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NoteType {
  id?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: number;
  level: number;
  category: number;
  user?: UserType;
  userId: number;
}

export interface BetterNoteType {
  id?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: {
    id: number;
    value: string;
    displayName: string;
  };
  level: {
    id: number;
    value: string;
    displayName: string;
  };
  category: {
    id: number;
    value: string;
    displayName: string;
  };
  user?: UserType;
  userId: number;
}
