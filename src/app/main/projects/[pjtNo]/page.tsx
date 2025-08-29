"use client";

import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import * as T from "@/types/tableTypes";
import {
  deleteProject,
  fetchProjectByPjtNo,
} from "@/services/api/api.projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { ProjectIdentity } from "./ProjectIdentity";
import { ProjectExecutionStatus } from "./ProjectExecutionStatus";
import { ProjectPhase } from "./ProjectPhase";
import { ProjectAssignments } from "./ProjectAssignments";

interface PageProps {
  params: Promise<{ pjtNo: string }>;
}

export default function Project({ params }: PageProps) {
  const { session, auth } = useAuth();
  const [project, setProject] = useState<T.Project>();
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuth) {
      (async () => {
        const pjtNo = (await params).pjtNo;
        const data = await fetchProjectByPjtNo(pjtNo);
        setProject(data);
      })();
    }
  }, [auth.isAuth, params]);

  async function onClick() {
    try {
      if (project) {
        const deleted = await deleteProject(project.id);
        if (deleted.status === 200) {
          toast.success("Project deleted successfully!");
          router.push("/main/projects");
        }
      }
    } catch (err) {
      console.error("Failed to delete project", err);
      toast.error("Failed to delete project");
    }
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full flex justify-between my-2">
        <span className="text-2xl font-bold">
          {project?.pjtNo} -- {project?.pjtName}
        </span>
        {(auth.isAdmin || session?.user.role === T.UserRole.PM) && (
          <div className="flex gap-2">
            {auth.isAdmin && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="cursor-pointer">
                    <Trash />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this project and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onClick}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            <Link href={`/main/projects/${project?.pjtNo}/edit`}>
              <Button className="cursor-pointer">
                <Edit />
              </Button>
            </Link>
          </div>
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
