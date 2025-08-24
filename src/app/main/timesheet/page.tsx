"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { columns } from "./timesheetColumns";
import { DataTable } from "./timesheetDataTable";
import { TimesheetReport, UserRole } from "@/types/tableTypes";
import { getMyTimesheetReports } from "@/services/api/api.users-me";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { fetchAllTimesheets } from "@/services/api/api.timesheet";

async function getTimesheets(role: UserRole): Promise<TimesheetReport[]> {
  if (role === UserRole.ADMIN) {
    const timesheets = await fetchAllTimesheets();
    return timesheets;
  } else {
    const timesheets = await getMyTimesheetReports();
    return timesheets;
  }
}

export default function Timesheet() {
  // change to async function after API fetch implementation
  const { session, auth } = useAuth();
  const [projects, setProjects] = useState<TimesheetReport[]>([]);

  const loadTimesheets = async () => {
    try {
      const data = await getTimesheets(session?.user.role as UserRole);
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    if (auth.isAuth) {
      loadTimesheets();
    }
  }, [auth.isAuth]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
      <div className="rounded-lg col-span-4">
        <Card>
          <CardHeader className="font-bold">
            {auth.isAdmin ? "All Timesheets" : "My Timesheet"}
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
