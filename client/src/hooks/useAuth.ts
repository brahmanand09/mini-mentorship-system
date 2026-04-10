import { useMutation } from "@tanstack/react-query";
import { api } from "../api/axios";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupData) => api.post("/auth/register", data)
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => api.post("/auth/login", data)
  });
};