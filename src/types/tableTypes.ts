// src/types/tableTypes.ts

// ----------------------
// ENUMS
// ----------------------
export enum UserRole {
  ENG_PE = "ENG_PE",
  ENG_SE = "ENG_SE",
  ENG_LEAD = "ENG_LEAD",
  PM = "PM",
  ADMIN = "ADMIN",
}

export enum Department {
  Delivery = "Delivery",
  Service = "Service",
}

export enum ExecutionStatus {
  LAGGING = "LAGGING",
  ONTRACK = "ONTRACK",
  LEADING = "LEADING",
}

// ----------------------
// MODELS
// ----------------------

export interface Phase {
  id: number;
  phaseCode: string;
  phaseName: string;
  weightFactor: number;
  createdAt: string; // Date serialized as string in FE
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  code: string;
  userRole: UserRole;
  dept: Department;
  joinAt: string;
  isResigned: boolean;
  resignedAt?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;

  // Relations (optional when fetching via API)
  pmProjects?: Project[];
  peProjects?: Project[];
  seProjects?: Project[];
  assignments?: UserProjectsAssignment[];
  timesheets?: TimesheetReport[];
  progress?: ProgressReport[];
}

export interface Project {
  id: number;
  pjtNo: string;
  pjtName: string;
  epcName: string;
  ownerName: string;

  assignedPMId?: number;
  assignedPEId?: number;
  assignedSEId?: number;
  currentPhaseId?: number;
  executionStatus: ExecutionStatus;
  isFinished: boolean;

  timeStart: string;
  timeEnd: string;

  // Phase milestone dates
  phase1EndDate?: string;
  phase2EndDate?: string;
  phase3EndDate?: string;
  phase4EndDate?: string;
  phase5EndDate?: string;
  phase6EndDate?: string;
  phase7EndDate?: string;
  phase8EndDate?: string;
  phase9EndDate?: string;

  // Relations
  assignedPM?: User;
  assignedPE?: User;
  assignedSE?: User;
  currentPhase?: Phase;

  assignments?: UserProjectsAssignment[];
  timesheets?: TimesheetReport[];
  progressReports?: ProgressReport[];
}

export interface UserProjectsAssignment {
  id: number;
  userId: number;
  projectId: number;
  assignedAt: string;

  // Relations
  user?: User;
  project?: Project;
}

export interface TimesheetReport {
  id: number;
  userId: number;
  projectId: number;
  pjtPhaseId: number;
  reportDate: string;
  hoursPerDay: string; // Decimal -> string in JSON
  createdAt: string;

  // Relations
  user?: User;
  project?: Project;
  phase?: Phase;
}

export interface ProgressReport {
  id: number;
  userId: number;
  projectId: number;
  pjtPhaseId: number;
  reportDate: string;
  thisWeekTask: string;
  thisWeekIssue: string;
  nextWeekTask: string;
  advancePhase: boolean;
  createdAt: string;

  // Relations
  user?: User;
  project?: Project;
  phase?: Phase;
}
