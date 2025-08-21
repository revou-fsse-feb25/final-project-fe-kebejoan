"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { columns } from "./projectColumns";
import { DataTable } from "./projectDataTable";
import { Project, UserRole } from "@/types/tableTypes";
import { getMyProjects } from "@/services/api/api.users-me";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { fetchProjects } from "@/services/api/api.projects";

async function getProjects(role: UserRole): Promise<Project[]> {
  if (role === UserRole.ADMIN) {
    const projects = await fetchProjects();
    return projects;
  } else {
    const projects = await getMyProjects();
    return projects;
  }
}

export default function Projects() {
  // change to async function after API fetch implementation
  const { session, auth } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  const loadProjects = async () => {
    try {
      const data = await getProjects(session?.user.role as UserRole);
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    if (auth.isAuth) {
      loadProjects();
    }
  }, [auth.isAuth]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
      <div className="rounded-lg col-span-4">
        <Card>
          <CardHeader className="font-bold">
            {auth.isAdmin ? "All Projects" : "My Projects"}
          </CardHeader>
          <CardContent>
            <DataTable data={projects} columns={columns} />
          </CardContent>
        </Card>
      </div>
      <div className="bg-secondary rounded-lg col-span-2 p-0"></div>
      <div className="bg-secondary rounded-lg p-0"></div>
      <div className="bg-secondary rounded-lg p-0"></div>
      <div className="bg-secondary rounded-lg p-0"></div>
    </div>
  );
}
