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
      assignedPM: "JDO",
      assignedPE: "JDO",
      assignedSE: "JDO",
    },
    {
      pjtNo: "P002",
      pjtName: "Project 2",
      pjtPhase: "Phase 2",
      pjtStatus: "LEADING",
      assignedPM: "JDO",
      assignedPE: "JDO",
      assignedSE: "JDO",
    },
    {
      pjtNo: "P003",
      pjtName: "Project 3",
      pjtPhase: "Phase 3",
      pjtStatus: "LAGGING",
      assignedPM: "JDO",
      assignedPE: "JDO",
      assignedSE: "JDO",
    },
    {
      pjtNo: "P004",
      pjtName: "Project 4",
      pjtPhase: "Phase 4",
      pjtStatus: "ONTRACK",
      assignedPM: "JDO",
      assignedPE: "JDO",
      assignedSE: "JDO",
    },
    {
      pjtNo: "P005",
      pjtName: "Project 5",
      pjtPhase: "Phase 5",
      pjtStatus: "LEADING",
      assignedPM: "JDO",
      assignedPE: "JDO",
      assignedSE: "JDO",
    },
    {
      pjtNo: "P006",
      pjtName: "Project 6",
      pjtPhase: "Phase 6",
      pjtStatus: "LAGGING",
      assignedPM: "JDO",
      assignedPE: "JDO",
      assignedSE: "JDO",
    },
  ];
}

export default function Projects() {
  // change to async function after API fetch implementation
  const isAdmin = true; // Replace with your authentication logic
  const projects = getProjects(); // Replace with await getProjects()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
      <div className="rounded-lg col-span-4">
        <Card>
          <CardHeader className="font-bold">
            {isAdmin ? "All Projects" : "My Projects"}
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
