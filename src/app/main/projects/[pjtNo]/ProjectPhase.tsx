import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React from "react";
import * as T from "@/types/tableTypes";

export function ProjectPhase({ project }: { project?: T.Project }) {
  const keys: (keyof T.Project)[] = [
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
