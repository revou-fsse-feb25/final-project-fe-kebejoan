import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import * as T from "@/types/tableTypes";

export function ProjectAssignments({ project }: { project?: T.Project }) {
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
