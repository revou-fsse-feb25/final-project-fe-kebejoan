import { z } from "zod";
import { UserRole, Department, ExecutionStatus } from "@/types/tableTypes";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50),
  code: z.string().length(3, { message: "Code must be exactly 3 characters" }),
  userRole: z.enum(UserRole, { message: "Invalid user role" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" }),
  dept: z.enum(Department, { message: "Invalid department" }),
  joinAt: z.union([z.string(), z.date()]),
});

export const updateUserSchema = createUserSchema.partial().extend({
  isResigned: z.boolean().optional(),
  resignedAt: z.union([z.string(), z.date()]).optional(),
});

export const createProjectSchema = z.object({
  pjtNo: z
    .string()
    .min(8, { message: "Project number must be at least 8 characters long" })
    .max(50, { message: "Project number must be at most 50 characters long" }),

  pjtName: z
    .string()
    .min(3, { message: "Project name must be at least 3 characters long" })
    .max(50, { message: "Project name must be at most 50 characters long" }),

  epcName: z
    .string()
    .min(3, { message: "EPC name must be at least 3 characters long" })
    .max(50, { message: "EPC name must be at most 50 characters long" }),

  ownerName: z
    .string()
    .min(3, { message: "Owner name must be at least 3 characters long" })
    .max(50, { message: "Owner name must be at most 50 characters long" }),

  assignedPMId: z.number().optional(),
  assignedPEId: z.number().optional(),
  assignedSEId: z.number().optional(),
  currentPhaseId: z.number().optional(),

  executionStatus: z.nativeEnum(ExecutionStatus, {
    error: () => ({
      message: "Execution status must be one of ON_TRACK, LEADING, or LAGGING",
    }),
  }),

  timeStart: z
    .union([z.string(), z.date()])
    .refine((val) => !isNaN(new Date(val as any).getTime()), {
      message: "Invalid start date",
    }),

  timeEnd: z
    .union([z.string(), z.date()])
    .refine((val) => !isNaN(new Date(val as any).getTime()), {
      message: "Invalid end date",
    }),

  phase1EndDate: z
    .union([z.string(), z.date()])
    .refine((val) => !val || !isNaN(new Date(val as any).getTime()), {
      message: "Invalid phase 1 end date",
    })
    .optional(),

  phase2EndDate: z
    .union([z.string(), z.date()])
    .refine((val) => !val || !isNaN(new Date(val as any).getTime()), {
      message: "Invalid phase 2 end date",
    })
    .optional(),

  phase3EndDate: z
    .union([z.string(), z.date()])
    .refine((val) => !val || !isNaN(new Date(val as any).getTime()), {
      message: "Invalid phase 3 end date",
    })
    .optional(),

  phase4EndDate: z
    .union([z.string(), z.date()])
    .refine((val) => !val || !isNaN(new Date(val as any).getTime()), {
      message: "Invalid phase 4 end date",
    })
    .optional(),

  phase5EndDate: z
    .union([z.string(), z.date()])
    .refine((val) => !val || !isNaN(new Date(val as any).getTime()), {
      message: "Invalid phase 5 end date",
    })
    .optional(),

  phase6EndDate: z
    .union([z.string(), z.date()])
    .refine((val) => !val || !isNaN(new Date(val as any).getTime()), {
      message: "Invalid phase 6 end date",
    })
    .optional(),

  phase7EndDate: z
    .union([z.string(), z.date()])
    .refine((val) => !val || !isNaN(new Date(val as any).getTime()), {
      message: "Invalid phase 7 end date",
    })
    .optional(),

  phase8EndDate: z
    .union([z.string(), z.date()])
    .refine((val) => !val || !isNaN(new Date(val as any).getTime()), {
      message: "Invalid phase 8 end date",
    })
    .optional(),

  phase9EndDate: z
    .union([z.string(), z.date()])
    .refine((val) => !val || !isNaN(new Date(val as any).getTime()), {
      message: "Invalid phase 9 end date",
    })
    .optional(),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  isFinished: z.boolean().optional(),
});

export const createProgressSchema = z.object({
  userId: z.number(),
  projectId: z.number(),
  pjtPhaseId: z.number(),
  reportDate: z.union([z.string(), z.date()]),
  thisWeekTask: z.string().min(1, { message: "This week's task is required" }),
  thisWeekIssue: z
    .string()
    .min(1, { message: "This week's issue is required" }),
  nextWeekTask: z.string().min(1, { message: "Next week's task is required" }),
  advancePhase: z.boolean(),
});

export const updateProgressSchema = z.object({
  thisWeekTask: z.string().optional(),
  thisWeekIssue: z.string().optional(),
  nextWeekTask: z.string().optional(),
  advancePhase: z.boolean().optional(),
});

export const createTimesheetSchema = z.object({
  userId: z.number(),
  projectId: z.number(),
  pjtPhaseId: z.number(),
  reportDate: z.union([z.string(), z.date()]),
  hoursPerDay: z.number().min(1).max(24),
});

export const updateTimesheetSchema = z.object({
  hoursPerDay: z.number().min(1).max(24).optional(),
});

export const loginSchema = z.object({
  code: z.string().length(3, { message: "Usercode must be 3 characters" }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters" }),
});
