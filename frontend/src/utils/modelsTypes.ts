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

export interface NoteStatus {
  id?: number;
  name: string;
}

export interface NoteLevel {
  id?: number;
  name: string;
}

export interface Note {
  id?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: NoteStatus;
  statusId: number;
  level: NoteLevel;
  leveld: number;
  user: User;
  userId: number;
}
