import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import * as T from "@/types/tableTypes";

export function ProjectIdentity({ project }: { project?: T.Project }) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="font-bold">
        <CardTitle className="text-xl">Project Identity</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="w-full">
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-2">
          <div className="font-bold col-span-1">Project Number</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
            {": "}
            {project?.pjtNo}
          </div>
          <div className="font-bold col-span-1">Project Name</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
            {": "}
            {project?.pjtName}
          </div>
          <div className="font-bold col-span-1">EPC</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
            {": "}
            {project?.epcName}
          </div>
          <div className="font-bold col-span-1">Owner</div>
          <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
            {": "}
            {project?.ownerName}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
