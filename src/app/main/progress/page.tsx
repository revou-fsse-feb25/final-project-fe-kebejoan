"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { columns } from "./progressColumns";
import { DataTable } from "./timesheetDataTable";
import { ProgressReport, UserRole } from "@/types/tableTypes";
import { getMyProgressReports } from "@/services/api/api.users-me";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { fetchAllProgressReports } from "@/services/api/api.progress";

async function getReports(role: UserRole): Promise<ProgressReport[]> {
  if (role === UserRole.ADMIN) {
    const progress = await fetchAllProgressReports();
    return progress;
  } else {
    const progress = await getMyProgressReports();
    return progress;
  }
}

export default function Progress() {
  // change to async function after API fetch implementation
  const { session, auth } = useAuth();
  const [projects, setProjects] = useState<ProgressReport[]>([]);

  const loadReports = async () => {
    try {
      const data = await getReports(session?.user.role as UserRole);
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    if (auth.isAuth) {
      loadReports();
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
