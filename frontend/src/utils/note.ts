export enum Status {
  PENDING = "PENDING",
  DONE = "DONE",
}

export enum Level {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export enum Category {
  SCHOOL = "SCHOOL",
  WORK = "WORK",
  PRIVATE = "PRIVATE",
}

export const statusDisplay: Record<Status, string> = {
  [Status.PENDING]: "Do zrobienia",
  [Status.DONE]: "Wykonano",
};

export const levelDisplay: Record<Level, string> = {
  [Level.LOW]: "Niski",
  [Level.MEDIUM]: "Normalny",
  [Level.HIGH]: "Wysoki",
};

export const categoryDisplay: Record<Category, string> = {
  [Category.SCHOOL]: "Szkoła",
  [Category.WORK]: "Praca",
  [Category.PRIVATE]: "Prywatne",
};

export const statusToDb: Record<Status, number> = {
  [Status.PENDING]: 1,
  [Status.DONE]: 2,
};

export const levelToDb: Record<Level, number> = {
  [Level.LOW]: 1,
  [Level.MEDIUM]: 2,
  [Level.HIGH]: 3,
};

export const categoryToDb: Record<Category, number> = {
  [Category.SCHOOL]: 1,
  [Category.WORK]: 2,
  [Category.PRIVATE]: 3,
};

export const dbToStatus: Record<number, Status> = {
  1: Status.PENDING,
  2: Status.DONE,
};

export const dbToLevel: Record<number, Level> = {
  1: Level.LOW,
  2: Level.MEDIUM,
  3: Level.HIGH,
};

export const dbToCategory: Record<number, Category> = {
  1: Category.SCHOOL,
  2: Category.WORK,
  3: Category.PRIVATE,
};
