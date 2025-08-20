import axios from "axios";
import * as T from "@/types/tableTypes";
import * as DTO from "@/types/dtos";
import { getSession } from "next-auth/react";

// Setup base axios instance for /users/me
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users/me`;

const apiMe = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

// ===================== API FUNCTIONS ===================== //

// 1. Report progress
export const reportProgress = async (
	data: DTO.CreateProgressDto
): Promise<T.ProgressReport> => {
	try {
		const res = await apiMe.post("/progress-reports", data);
		return res.data;
	} catch (err) {
		console.error("Error reporting progress:", err);
		throw new Error("Failed to report progress");
	}
};

// 2. Report timesheet
export const reportTimesheet = async (
	data: DTO.CreateTimesheetDto
): Promise<T.TimesheetReport> => {
	try {
		const res = await apiMe.post("/timesheet-reports", data);
		return res.data;
	} catch (err) {
		console.error("Error reporting timesheet:", err);
		throw new Error("Failed to report timesheet");
	}
};

// 3. Get my timesheet reports
export const getMyTimesheetReports = async (): Promise<T.TimesheetReport[]> => {
	try {
		const res = await apiMe.get("/timesheet-reports");
		return res.data;
	} catch (err) {
		console.error("Error fetching my timesheet reports:", err);
		throw new Error("Failed to fetch my timesheet reports");
	}
};

// 4. Get my progress reports
export const getMyProgressReports = async (): Promise<T.ProgressReport[]> => {
	try {
		const res = await apiMe.get("/progress-reports");
		return res.data;
	} catch (err) {
		console.error("Error fetching my progress reports:", err);
		throw new Error("Failed to fetch my progress reports");
	}
};

// 5. Get my projects
export const getMyProjects = async (): Promise<T.Project[]> => {
	try {
		const session = await getSession();

		const res = await apiMe.get("/projects", {
			headers: {
				Authorization: `Bearer ${session?.accessToken}`,
			},
		});
		return res.data;
	} catch (err) {
		console.error("Error fetching my projects:", err);
		throw new Error("Failed to fetch my projects");
	}
};

// 6. Get my profile
export const getMe = async (): Promise<T.User> => {
	try {
		const res = await apiMe.get("");
		return res.data;
	} catch (err) {
		console.error("Error fetching current user:", err);
		throw new Error("Failed to fetch current user");
	}
};

// 7. Update my profile
export const updateMe = async (data: DTO.UpdateUserDto): Promise<T.User> => {
	try {
		const res = await apiMe.patch("", data);
		return res.data;
	} catch (err) {
		console.error("Error updating user:", err);
		throw new Error("Failed to update user");
	}
};
