import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import * as T from "@/types/tableTypes";

export function ProjectExecutionStatus({ project }: { project?: T.Project }) {
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
          <div className="flex gap-2">
            <Badge
              className="font-bold text-2xl"
              variant={
                project?.executionStatus === T.ExecutionStatus.LAGGING
                  ? "destructive"
                  : "default"
              }
            >
              {project?.currentPhase?.phaseCode}
            </Badge>
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
          </div>
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
