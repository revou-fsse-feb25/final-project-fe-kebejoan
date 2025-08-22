// src/services/api.progress.ts

import axios from "axios";
import * as T from "@/types/tableTypes"; // <-- place your ProgressReport type here
import * as DTO from "@/types/dtos"; // <-- if you have related DTOs
import { getSession } from "next-auth/react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reports/progress`;

const apiProgress = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiProgress.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// ----------------------
// API functions with try/catch
// ----------------------

export const fetchProgressByPmId = async (
  pmId: number
): Promise<T.ProgressReport[]> => {
  try {
    const response = await apiProgress.get<T.ProgressReport[]>(`/pm/${pmId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching progress reports for PM ${pmId}:`, error);
    throw new Error("Failed to fetch progress reports by PM");
  }
};

export const fetchAllProgressReports = async (
  query?: DTO.ReportQueryDto
): Promise<T.ProgressReport[]> => {
  try {
    const response = await apiProgress.get<T.ProgressReport[]>("/", {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all progress reports:", error);
    throw new Error("Failed to fetch all progress reports");
  }
};

export const fetchProgressReportById = async (
  id: number
): Promise<T.ProgressReport> => {
  try {
    const response = await apiProgress.get<T.ProgressReport>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching progress report with id ${id}:`, error);
    throw new Error("Failed to fetch progress report by id");
  }
};
