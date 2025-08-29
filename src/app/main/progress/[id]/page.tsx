"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { fetchProgressReportById } from "@/services/api/api.progress";
import { fetchProjectById, updateProject } from "@/services/api/api.projects";
import * as T from "@/types/tableTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface PageProps {
  params: Promise<{ id: number }>;
}

export default function Progress({ params }: PageProps) {
  const { session, auth } = useAuth();
  const [progress, setProgress] = useState<T.ProgressReport>();
  const [authorizedToAdvance, setAuthorizedToAdvance] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuth) {
      (async () => {
        const id = (await params).id;
        const data = await fetchProgressReportById(id as number);
        setProgress(data);
      })();
    }
  }, [auth.isAuth, params]);

  useEffect(() => {
    if (
      session?.user.role === T.UserRole.PM &&
      progress?.advancePhase === true
    ) {
      setAuthorizedToAdvance(true);
    } else {
      setAuthorizedToAdvance(false);
    }
  }, [session?.user, progress?.advancePhase]);

  async function onClick() {
    try {
      const project = await fetchProjectById(progress?.project?.id as number);
      if (!project) {
        throw new Error("Project not found");
      }
      const updatedProject = await updateProject(
        progress?.project?.id as number,
        { currentPhaseId: (project.currentPhaseId ?? 0) + 1 }
      );
      if (!updatedProject) {
        throw new Error("Failed to advance phase");
      }
    } catch (err) {
      console.error("Failed to advance phase", err);
      toast.error("Failed to advance phase");
    }
    router.push(`/main/projects/${progress?.project?.pjtNo}`);
    toast.success("Phase advanced successfully!");
  }

  return (
    <>
      <span className="flex gap-2 justify-between">
        <div className="text-2xl font-bold">{progress?.project?.pjtNo}</div>
        {authorizedToAdvance && (
          <div className="flex gap-2 items-center">
            <span>Accept Phase Advance?</span>
            <Button onClick={onClick}> ACCEPT </Button>
          </div>
        )}
      </span>
      <div className="w-full py-2">
        <Card className="w-full h-full py-2">
          <CardHeader className="font-bold">
            <CardTitle className="text-2xl">Progress</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="w-full">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-2">
              <div className="font-bold col-span-1">Project Number</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.project?.pjtNo}
              </div>
              <div className="font-bold col-span-1">Project Name</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.project?.pjtName}
              </div>
              <div className="font-bold col-span-1">Phase</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": P"}
                {progress?.pjtPhaseId}
              </div>
              <div className="font-bold col-span-1">Reporter</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.user?.code}
              </div>
              <div className="font-bold col-span-1">This Weeks Tasks</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.thisWeekTask}
              </div>
              <div className="font-bold col-span-1">This Weeks Issues</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.thisWeekIssue}
              </div>
              <div className="font-bold col-span-1">Next Week Tasks</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.nextWeekTask}
              </div>
              <div className="font-bold col-span-1">Report Date</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.reportDate}
              </div>
              <div className="font-bold col-span-1">Advance Phase</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.advancePhase ? "Yes" : "No"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
