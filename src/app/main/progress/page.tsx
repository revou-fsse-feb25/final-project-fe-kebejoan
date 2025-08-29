"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { columns } from "./progressColumns";
import { DataTable } from "./progressDataTable";
import { ProgressReport, UserRole } from "@/types/tableTypes";
import { getMyProgressReports } from "@/services/api/api.users-me";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { fetchAllProgressReports } from "@/services/api/api.progress";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

async function getReports(role: UserRole): Promise<ProgressReport[]> {
  if (role === UserRole.ADMIN || role === UserRole.PM) {
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
  const [progress, setProgress] = useState<ProgressReport[]>([]);

  // const loadReports = async () => {
  //   try {
  //     const data = await getReports(session?.user.role as UserRole);
  //     setProgress(data);
  //   } catch (err) {
  //     console.error("Error fetching progress:", err);
  //   }
  // };

  useEffect(() => {
    if (auth.isAuth) {
      (async () => {
        try {
          const data = await getReports(session?.user.role as UserRole);
          setProgress(data);
        } catch (err) {
          console.error("Error fetching progress:", err);
        }
      })();
    }
  }, [auth.isAuth, session?.user.role]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
      <div className="rounded-lg col-span-4">
        <Card>
          <CardHeader className="font-bold">
            <div className="flex justify-between">
              <div>
                {auth.isAdmin ? "All Progress Report" : "My Progress Report"}
              </div>
              <Link href="/main/progress/create">
                <Button className="cursor-pointer">
                  <PlusCircle />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable data={progress} columns={columns} />
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
