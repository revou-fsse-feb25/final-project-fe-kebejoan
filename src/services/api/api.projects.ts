import axios from "axios";
import * as T from "@/types/tableTypes";
import * as DTO from "@/types/dtos";
import { sessionFn } from "./api._get-session";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/projects`;

const apiProjects = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiProjects.interceptors.request.use(async (config) => {
  const session = await sessionFn();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// ----------------------
// API functions with try/catch
// ----------------------

// ✅ Check if project number exists
export const checkIfPjtNoExists = async (
  pjtNo: string
): Promise<{ exists: boolean }> => {
  try {
    const response = await apiProjects.get<{ exists: boolean }>(
      `/pjtNo/${pjtNo}/check`
    );
    return response.data;
  } catch (error) {
    console.error(`Error checking pjtNo ${pjtNo}:`, error);
    throw new Error("Failed to check if project number exists");
  }
};

// ✅ Get one project by project number
export const fetchProjectByPjtNo = async (
  pjtNo: string
): Promise<T.Project> => {
  try {
    const response = await apiProjects.get<T.Project>(`/pjtNo/${pjtNo}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with pjtNo ${pjtNo}:`, error);
    throw new Error("Failed to fetch project by project number");
  }
};

// ✅ Create new project
export const createProject = async (
  data: DTO.CreateProjectDto
): Promise<T.Project> => {
  try {
    const response = await apiProjects.post<T.Project>("/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
};

// ✅ Get all projects (optionally with query params)
export const fetchProjects = async (
  query?: Record<string, any> // TODO: add query dto here
): Promise<T.Project[]> => {
  try {
    const response = await apiProjects.get<T.Project[]>("/", {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
};

// ✅ Get one project by ID
export const fetchProjectById = async (id: number): Promise<T.Project> => {
  try {
    const response = await apiProjects.get<T.Project>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw new Error("Failed to fetch project by id");
  }
};

// ✅ Update project
export const updateProject = async (
  id: number,
  data: DTO.UpdateProjectDto
): Promise<T.Project> => {
  try {
    const response = await apiProjects.patch<T.Project>(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating project with id ${id}:`, error);
    throw new Error("Failed to update project");
  }
};

// ✅ Delete project
export const deleteProject = async (
  id: number
): Promise<{ status: number; message: string }> => {
  try {
    const response = await apiProjects.delete<{
      status: number;
      message: string;
    }>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    throw new Error("Failed to delete project");
  }
};
