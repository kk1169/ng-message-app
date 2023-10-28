export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export enum TodoStatus {
  BACKLOG = "Backlog",
  TODO = "Todo",
  PROGRESS = "Progress",
  TEST = "Test",
  DEPLOY = "Deploy",
  DONE = "Done",
}

export enum Status {
  Active = 1,
  Inactive = 0,
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: string;
}
