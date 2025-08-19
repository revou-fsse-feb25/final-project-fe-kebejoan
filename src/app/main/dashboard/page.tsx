"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Project, columns } from "./projectColumns";
import { DataTable } from "./projectDataTable";

function getProjects(): Project[] {
  //change to real getProjects data from API (async)
  return [
    {
      pjtNo: "P001",
      pjtName: "Project 1",
      pjtPhase: "Phase 1",
      pjtStatus: "ONTRACK",
    },
    {
      pjtNo: "P002",
      pjtName: "Project 2",
      pjtPhase: "Phase 2",
      pjtStatus: "LEADING",
    },
    {
      pjtNo: "P003",
      pjtName: "Project 3",
      pjtPhase: "Phase 3",
      pjtStatus: "LAGGING",
    },
  ];
}

export default function Dashboard() {
  // change to async function after API fetch implementation
  const isAdmin = true; // Replace with your authentication logic
  const projects = getProjects(); // Replace with await getProjects()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
      <div className="rounded-lg col-span-3">
        <Card>
          <CardHeader className="font-bold">Highlighted Project</CardHeader>
          <CardContent>
            <DataTable data={projects} columns={columns} />
          </CardContent>
        </Card>
      </div>
      <div className="bg-secondary rounded-lg col-span-1">
        <Card className="h-full">
          <CardHeader className="font-bold">
            {isAdmin ? "Highest Load" : "Current Load"}
          </CardHeader>
          <CardContent>LOAD</CardContent>
        </Card>
      </div>
      <div className="bg-secondary rounded-lg col-span-2"></div>
      <div className="bg-secondary rounded-lg"></div>
      <div className="bg-secondary rounded-lg"></div>
      <div className="bg-secondary rounded-lg p-0"></div>
    </div>
  );
}
