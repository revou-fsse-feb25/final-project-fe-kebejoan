"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import * as T from "@/types/tableTypes";
import { fetchProjectByPjtNo } from "@/services/api/api.projects";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Edit2 } from "lucide-react";

interface PageProps {
  params: Promise<{ pjtNo: string }>;
}

function ProjectPhase({ project }: { project?: T.Project }) {
  let keys: (keyof T.Project)[] = [
    "phase1EndDate",
    "phase2EndDate",
    "phase3EndDate",
    "phase4EndDate",
    "phase5EndDate",
    "phase6EndDate",
    "phase7EndDate",
    "phase8EndDate",
    "phase9EndDate",
  ];

  return (
    <Card className="w-full h-full">
      <CardHeader className="font-bold">
        <CardTitle className="text-xl">Project Phase End Date</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full">
        <div className="grid grid-cols-4">
          {keys.map((key, index) => {
            const dateStr = project?.[key] as string | undefined;
            return (
              <React.Fragment key={key}>
                <div className="font-bold">Phase{index + 1}</div>
                <div key={index}>
                  {": "}
                  {dateStr ? new Date(dateStr).toLocaleDateString() : "N/A"}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectAssignments({ project }: { project?: T.Project }) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="font-bold">
        <CardTitle className="text-xl">Project Assignments</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-3 gap-2">
          <div className="font-bold col-span-1">Project Manager</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2 2xl:col-span-2 text-wrap">
            {": "}
            {project?.assignedPM?.name} {"("}
            {project?.assignedPM?.code}
            {")"}
          </div>
          <div className="font-bold col-span-1">System Engineer</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2 2xl:col-span-2 text-wrap">
            {": "}
            {project?.assignedSE?.name} {"("}
            {project?.assignedSE?.code}
            {")"}
          </div>
          <div className="font-bold col-span-1">Project Engineer</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-2 2xl:col-span-2 text-wrap">
            {": "}
            {project?.assignedPE?.name} {"("}
            {project?.assignedPE?.code}
            {")"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectExecutionStatus({ project }: { project?: T.Project }) {
  let currentPhaseEndDate: string | null = null;

  if (project?.currentPhaseId) {
    const key = `phase${project.currentPhaseId}EndDate` as keyof T.Project;
    currentPhaseEndDate = project[key] as string;
  }
  return (
    <Card className="w-full h-full">
      <CardHeader className="font-bold">
        <CardTitle className="text-xl">Execution Status</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full">
        <div className="flex flex-col items-center gap-1">
          <Badge
            className="font-bold text-2xl"
            variant={
              project?.executionStatus === T.ExecutionStatus.LAGGING
                ? "destructive"
                : "default"
            }
          >
            {project?.executionStatus}
          </Badge>
          <Separator className="my-2" />
          <span className=" text-">
            {project?.currentPhase?.phaseCode} scheduled to be finished at:{" "}
            {currentPhaseEndDate
              ? new Date(currentPhaseEndDate).toLocaleDateString()
              : "N/A"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectIdentity({ project }: { project?: T.Project }) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="font-bold">
        <CardTitle className="text-xl">Project Identity</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-2">
          <div className="font-bold col-span-1">Project Number</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
            {": "}
            {project?.pjtNo}
          </div>
          <div className="font-bold col-span-1">Project Name</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
            {": "}
            {project?.pjtName}
          </div>
          <div className="font-bold col-span-1">EPC</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
            {": "}
            {project?.epcName}
          </div>
          <div className="font-bold col-span-1">Owner</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
            {": "}
            {project?.ownerName}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Project({ params }: PageProps) {
  const { session, auth } = useAuth();
  const [project, setProject] = useState<T.Project>();

  useEffect(() => {
    if (auth.isAuth) {
      (async () => {
        const pjtNo = (await params).pjtNo;
        const data = await fetchProjectByPjtNo(pjtNo);
        setProject(data);
      })();
    }
  }, [auth.isAuth]);

  return (
    <>
      {/* <div>{(await params).pjtNo}</div> */}
      <div className="w-full flex justify-between my-2">
        <span className="text-2xl font-bold">
          {project?.pjtNo} -- {project?.pjtName}
        </span>
        {(auth.isAdmin || session?.user.role === T.UserRole.PM) && (
          <Link href={`/main/projects/${project?.pjtNo}/edit`}>
            <Button className="cursor-pointer">
              <Edit />
            </Button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
        <ScrollArea className="bg-secondary p-0 rounded-lg flex justify-center items-center col-span-1 lg:col-span-2 2xl:col-span-4 h-[364px]">
          <div className="w-full h-[364px] p-4 flex justify-center items-center">
            <div className="bg-secondary outline-1 outline-primary p-1 rounded-lg w-[1550px] h-full flex justify-center items-center">
              {/* <div className="bg-secondary p-1 rounded-lg w-4 h-4"> */}
              timeline content here
              {/* </div> */}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="p-0 rounded-lg col-span-1 lg:col-span-2 2xl:col-span-3">
          <ProjectIdentity project={project} />
        </div>
        <div className="p-0 rounded-lg col-span-1">
          <ProjectExecutionStatus project={project} />
        </div>
        <div className="p-0 rounded-lg col-span-1 2xl:col-span-2">
          <ProjectAssignments project={project} />
        </div>
        <div className="p-0 rounded-lg col-span-1 2xl:col-span-2">
          <ProjectPhase project={project} />
        </div>
      </div>
    </>
  );
}
