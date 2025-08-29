"use client";

import { ProgressInputFields } from "@/components/forms/progress/ProgressInputFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuth } from "@/hooks/useAuth";
import { fetchProjectById } from "@/services/api/api.projects";
import { getMyProjects, reportProgress } from "@/services/api/api.users-me";
import { createProgressSchema } from "@/types/schemas";
import { Project } from "@/types/tableTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export type CreateProgressReportFormValues = z.infer<
  typeof createProgressSchema
>;

export default function CreateProgressReport() {
  const router = useRouter();
  const { session, auth } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  const form = useForm<CreateProgressReportFormValues>({
    resolver: zodResolver(createProgressSchema),
    defaultValues: {
      userId: session?.user.id,
      projectId: undefined,
      pjtPhaseId: undefined,
      reportDate: undefined,
      thisWeekTask: "",
      thisWeekIssue: "",
      nextWeekTask: "",
      advancePhase: false,
    },
  });

  useEffect(() => {
    if (auth.isAuth || session) {
      (async () => {
        try {
          const data = await getMyProjects();
          setProjects(data);
        } catch (error) {
          console.error("Failed to fetch projects", error);
        }
      })();
      form.reset({
        userId: session?.user.id,
        projectId: undefined,
        pjtPhaseId: undefined,
        reportDate: undefined,
        thisWeekTask: "",
        thisWeekIssue: "",
        nextWeekTask: "",
        advancePhase: false,
      });
    }
  }, [auth.isAuth, session, form]);

  useEffect(() => {
    if (form.getValues().projectId) {
      (async () => {
        try {
          const data = await fetchProjectById(form.getValues().projectId);
          if (data) {
            form.setValue("pjtPhaseId", data.currentPhaseId as number);
          }
        } catch (error) {
          console.error("Failed to fetch projects", error);
        }
      })();
    }
  }, [form.watch("projectId")]);

  const onSubmit = async (values: CreateProgressReportFormValues) => {
    console.log("onsubmit values:", values);
    try {
      const res = await reportProgress(values);
      if (!res) {
        toast.error("Project Creation Failed");
      } else {
        toast.success("Project Created Successfully!");
        router.push(`/main/progress/`);
      }
    } catch (err) {
      console.error("Failed to create project", err);
      toast.error("Failed to create project");
    }
  };

  if (auth.isLoading) {
    return (
      <div className="container mx-auto py-6">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Create New Project</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log("validation errors", errors)
          )}
          className="gap-4 w-full flex flex-col"
        >
          <ProgressInputFields form={form} projects={projects} />

          <Button type="submit" className="w-full col-span-1 ">
            Create Progress Report
          </Button>
        </form>
      </Form>
    </div>
  );
}
