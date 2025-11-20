import { createAuthClient } from "better-auth/react"
import { mockSession } from "./mock-data"

// Original auth client (commented out for demo)
// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
// })

// Mock auth functions for demo purposes
export const signIn = async () => {
  console.log("Mock sign in");
  return { data: mockSession, error: null };
};

export const signOut = async () => {
  console.log("Mock sign out");
  return { data: null, error: null };
};

export const signUp = async () => {
  console.log("Mock sign up");
  return { data: mockSession, error: null };
};

export const useSession = () => {
  return {
    data: mockSession,
    isPending: false,
    error: null,
  };
};

export const useUser = () => {
  return {
    data: mockSession.user,
    isPending: false,
    error: null,
  };
};

export const getSession = async () => {
  return { data: mockSession, error: null };
};

// Real auth client preserved for future use
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
})