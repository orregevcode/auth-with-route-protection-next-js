import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  username?: string;
  img?: string;
  role?: string;
  isLoggedIn: boolean;
}


export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "app-session",
    cookieOptions:{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        
    }
   
}


export const defaultSessionData: SessionData = {
    isLoggedIn: false,
   
};