// src/types/types.dto.ts
import { UserRole, Department, ExecutionStatus } from "@/types/tableTypes";

// ---------- USER DTOs ----------
export interface CreateUserDto {
  name: string;
  code: string;
  userRole: UserRole;
  password: string;
  dept: Department;
  joinAt: Date | string; // FE usually sends string (e.g., "2025-08-14")
}

export interface UpdateUserDto {
  name?: string;
  code?: string;
  userRole?: UserRole;
  password?: string;
  dept?: Department;
  isResigned?: boolean;
  resignedAt?: Date | string;
}

// ---------- REPORT DTOs ----------
export interface ReportQueryDto {
  userId?: number;
  projectId?: number;
  pjtPhaseId?: number;
  reportDate?: Date | string;
  OR?: any[];
}

// ---------- PROGRESS DTOs ----------
export interface CreateProgressDto {
  userId: number;
  projectId: number;
  pjtPhaseId: number;
  reportDate: Date | string;
  thisWeekTask: string;
  thisWeekIssue: string;
  nextWeekTask: string;
  advancePhase: boolean;
}

export interface UpdateProgressDto {
  thisWeekTask?: string;
  thisWeekIssue?: string;
  nextWeekTask?: string;
  advancePhase?: boolean;
}

// ---------- TIMESHEET DTOs ----------
export interface CreateTimesheetDto {
  userId: number;
  projectId: number;
  pjtPhaseId: number;
  reportDate: Date | string;
  hoursPerDay: number;
}

export interface UpdateTimesheetDto {
  hoursPerDay?: number;
}

// ---------- PROJECT DTOs ----------
export interface CreateProjectDto {
  pjtNo: string;
  pjtName: string;
  epcName: string;
  ownerName: string;
  assignedPMId?: number;
  assignedPEId?: number;
  assignedSEId?: number;
  currentPhaseId?: number;
  executionStatus: ExecutionStatus;
  timeStart: Date | string;
  timeEnd: Date | string;
  phase1EndDate?: Date | string;
  phase2EndDate?: Date | string;
  phase3EndDate?: Date | string;
  phase4EndDate?: Date | string;
  phase5EndDate?: Date | string;
  phase6EndDate?: Date | string;
  phase7EndDate?: Date | string;
  phase8EndDate?: Date | string;
  phase9EndDate?: Date | string;
}

export interface ProjectQueryDto {
  pmId?: number;
  seId?: number;
  peId?: number;
  pmCode?: string;
  seCode?: string;
  peCode?: string;
  userId?: number;
  userCode?: string;
  OR?: any[];
  AND?: any[];
}

export interface UpdateProjectDto extends Partial<CreateProjectDto> {
  isFinished?: boolean;
}

// ---------- AUTH DTOs ----------
export interface LoginDto {
  code: string;
  password: string;
}
