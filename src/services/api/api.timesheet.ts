// src/services/api.timesheet.ts
import axios from "axios";
import * as T from "@/types/tableTypes";
import * as DTO from "@/types/dtos";
import { getSession } from "next-auth/react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reports/timesheet`;

const apiTimesheet = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token
apiTimesheet.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// ----------------------
// API functions with try/catch
// ----------------------

// [PM or ADMIN] Get many timesheet reports by PM ID
export const fetchTimesheetsByPmId = async (
  pmId: number
): Promise<T.TimesheetReport[]> => {
  try {
    const response = await apiTimesheet.get<T.TimesheetReport[]>(`/pm/${pmId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching timesheets for PM ${pmId}:`, error);
    throw new Error("Failed to fetch timesheets by PM ID");
  }
};

// [ADMIN or PM] Get all timesheet reports (with optional query)
export const fetchAllTimesheets = async (
  query?: DTO.ReportQueryDto
): Promise<T.TimesheetReport[]> => {
  try {
    const response = await apiTimesheet.get<T.TimesheetReport[]>("/", {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all timesheets:", error);
    throw new Error("Failed to fetch all timesheets");
  }
};

// [ADMIN, PM, ENG] Get one timesheet report by ID
export const fetchTimesheetById = async (
  id: number
): Promise<T.TimesheetReport> => {
  try {
    const response = await apiTimesheet.get<T.TimesheetReport>(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching timesheet with id ${id}:`, error);
    throw new Error("Failed to fetch timesheet by id");
  }
};
