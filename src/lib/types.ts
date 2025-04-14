export type InitialState = {
  error: boolean;
  success: boolean;
  message: string;
  loading: boolean;
  isAuthenticated?: boolean;
  user?: UserType;
};
export type UserType = {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: "subscriber" | "admin";
  created_at: Date;
  updated_at: Date;
  company: string;
  marketing_emails_allowed: boolean;
};
