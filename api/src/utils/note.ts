export enum Status {
  PENDING = "PENDING",
  DONE = "DONE",
}

export enum Level {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
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

export const statusToDb: Record<Status, number> = {
  [Status.PENDING]: 1,
  [Status.DONE]: 2,
};

export const levelToDb: Record<Level, number> = {
  [Level.LOW]: 1,
  [Level.MEDIUM]: 2,
  [Level.HIGH]: 3,
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
