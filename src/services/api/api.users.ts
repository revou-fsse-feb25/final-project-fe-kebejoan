import axios from "axios";
import * as T from "@/types/tableTypes";
import * as DTO from "@/types/dtos";
import { sessionFn } from "./api._get-session";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

const apiUsers = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiUsers.interceptors.request.use(async (config) => {
  const session = await sessionFn();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// ----------------------
// API functions with try/catch
// ----------------------

export const fetchUsers = async (): Promise<T.User[]> => {
  try {
    const response = await apiUsers.get<T.User[]>("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};

export const fetchUserById = async (id: number): Promise<T.User> => {
  try {
    const response = await apiUsers.get<T.User>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw new Error("Failed to fetch user by id");
  }
};

export const fetchUserByCode = async (code: string): Promise<T.User> => {
  try {
    const response = await apiUsers.get<T.User>(`/code/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with code ${code}:`, error);
    throw new Error("Failed to fetch user by code");
  }
};

export const checkIfCodeExists = async (
  code: string
): Promise<{ exists: boolean }> => {
  try {
    const response = await apiUsers.get<{ exists: boolean }>(`/check/${code}`);
    return response.data;
  } catch (error) {
    console.error(`Error checking code ${code}:`, error);
    throw new Error("Failed to check if code exists");
  }
};

export const createUser = async (data: DTO.CreateUserDto): Promise<T.User> => {
  try {
    const response = await apiUsers.post<T.User>("/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export const updateUser = async (
  id: number,
  data: DTO.UpdateUserDto
): Promise<T.User> => {
  try {
    const response = await apiUsers.patch<T.User>(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw new Error("Failed to update user");
  }
};

export const deleteUser = async (
  id: number
): Promise<{ status: number; message: string }> => {
  try {
    const response = await apiUsers.delete<{ status: number; message: string }>(
      `/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw new Error("Failed to delete user");
  }
};
