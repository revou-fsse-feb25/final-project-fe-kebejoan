"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  fetchProjectByPjtNo,
  updateProject,
} from "@/services/api/api.projects";
import { createProjectSchema, updateProjectSchema } from "@/types/schemas";
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
import { useEffect, useState } from "react";
import { Project } from "@/types/tableTypes";
import { CreateProjectFormValues } from "../../create/page";

export type UpdateProjectFormValues = z.infer<typeof updateProjectSchema>;

interface PageProps {
  params: Promise<{ pjtNo: string }>;
}

export default function EditProject({ params }: PageProps) {
  const router = useRouter();
  const { auth } = useAuth();
  const { PMs, SEs, PEs } = useProjectUsers(auth);
  const [project, setProject] = useState<Project>();

  useEffect(() => {
    if (auth.isAuth) {
      (async () => {
        const pjtNo = (await params).pjtNo;
        const data = await fetchProjectByPjtNo(pjtNo);
        setProject(data);
      })();
      // setProject(project);
    }
  }, [auth.isAuth, params, project]);

  const form = useForm<CreateProjectFormValues>({
    //TODO: Still incorrect typing
    resolver: zodResolver(createProjectSchema), //TODO: Still incorrect typing
    defaultValues: {
      pjtNo: "",
      pjtName: "",
      epcName: "",
      ownerName: "",
      assignedPMId: undefined,
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

  useEffect(() => {
    if (project) {
      form.reset({
        pjtNo: project.pjtNo ?? "",
        pjtName: project.pjtName ?? "",
        epcName: project.epcName ?? "",
        ownerName: project.ownerName ?? "",
        assignedPMId: project.assignedPMId ?? undefined,
        assignedPEId: project.assignedPEId ?? undefined,
        assignedSEId: project.assignedSEId ?? undefined,
        currentPhaseId: project.currentPhaseId ?? undefined,
        executionStatus: project.executionStatus ?? ExecutionStatus.ONTRACK,
        timeStart: project.timeStart ?? undefined,
        timeEnd: project.timeEnd ?? undefined,
        phase1EndDate: project.phase1EndDate ?? undefined,
        phase2EndDate: project.phase2EndDate ?? undefined,
        phase3EndDate: project.phase3EndDate ?? undefined,
        phase4EndDate: project.phase4EndDate ?? undefined,
        phase5EndDate: project.phase5EndDate ?? undefined,
        phase6EndDate: project.phase6EndDate ?? undefined,
        phase7EndDate: project.phase7EndDate ?? undefined,
        phase8EndDate: project.phase8EndDate ?? undefined,
        phase9EndDate: project.phase9EndDate ?? undefined,
      });
    }
  }, [project, form, PMs, SEs, PEs]);
  const onSubmit = async (values: UpdateProjectFormValues) => {
    console.log("onsubmit values:", values);
    try {
      if (project === undefined) {
        toast.error("Project is not found");
        return;
      }
      const res = await updateProject(project?.id, values);
      if (!res) {
        toast.error("Project Creation Failed");
      } else {
        toast.success("Project Updated Successfully!");
        router.push(`/main/projects/${values.pjtNo}`);
      }
    } catch (err) {
      console.error("Failed to create project", err);
      toast.error("Failed to create project");
    }
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  console.log("form", form);

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
            Edit Project
          </Button>
        </form>
      </Form>
    </div>
  );
}
