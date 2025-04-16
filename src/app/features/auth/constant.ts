export const AUTH_SESSION_NAME = "session";

export type Role = "user" | "admin" | "moderator";
export type Session = {
  email: string | null;
  phone: string;
  userId: string;
  name: string;
  role: Role;
  // avatar :
};
