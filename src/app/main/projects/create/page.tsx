"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createProject } from "@/services/api/api.projects";
import { createProjectSchema } from "@/types/schemas";
import { useProjectUsers } from "@/hooks/useProjectUsers";
import { useAuth } from "@/hooks/useAuth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { ProjectIdentityFields } from "@/components/forms/project/ProjectIdentityFields";
import { ProjectAssignmentFields } from "@/components/forms/project/ProjectAssignmentFields";
import { ProjectPhaseFields } from "@/components/forms/project/ProjectPhaseFields";
import { ProjectDatePickerFields } from "@/components/forms/project/ProjectDatePickerFields";
import { Separator } from "@/components/ui/separator";
import { ExecutionStatus } from "@/types/tableTypes";
import { UserRole } from "@/types/tableTypes";

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;

export default function CreateProjectPage() {
  const router = useRouter();
  const { session, auth } = useAuth();
  const { PMs, SEs, PEs } = useProjectUsers(auth);
  const isPM = session?.user.role === UserRole.PM;

  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      pjtNo: "",
      pjtName: "",
      epcName: "",
      ownerName: "",
      assignedPMId: isPM ? session?.user.id : undefined,
      assignedPEId: undefined,
      assignedSEId: undefined,
      currentPhaseId: undefined,
      executionStatus: ExecutionStatus.ONTRACK,
      timeStart: undefined,
      timeEnd: undefined,
      phase1EndDate: undefined,
      phase2EndDate: undefined,
      phase3EndDate: undefined,
      phase4EndDate: undefined,
      phase5EndDate: undefined,
      phase6EndDate: undefined,
      phase7EndDate: undefined,
      phase8EndDate: undefined,
      phase9EndDate: undefined,
    },
  });

  const onSubmit = async (values: CreateProjectFormValues) => {
    try {
      const res = await createProject(values);
      if (!res) {
        toast.error("Project Creation Failed");
      } else {
        toast.success("Project Created Successfully!");
        router.push(`/main/projects/${values.pjtNo}`);
      }
    } catch (err) {
      console.error("Failed to create project", err);
      toast.error("Failed to create project");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-4 w-full flex flex-col"
        >
          <ProjectIdentityFields form={form} />
          <ProjectAssignmentFields form={form} PMs={PMs} SEs={SEs} PEs={PEs} />
          <ProjectDatePickerFields form={form} />
          <span className="mt-4 text-xl font-bold">Phase Date</span>
          <Separator />
          <ProjectPhaseFields form={form} />

          <Button type="submit" className="w-full col-span-1 ">
            Create Project
          </Button>
        </form>
      </Form>
    </div>
  );
}
