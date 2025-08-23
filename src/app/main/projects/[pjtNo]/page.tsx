import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import * as T from "@/types/tableTypes";

interface PageProps {
  params: Promise<{ pjtNo: string }>;
}

function ProjectIdentity() {
  return (
    <Card className="w-full">
      <CardHeader className="font-bold">
        <CardTitle>Project Identity</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Pjt Name</div>
      </CardContent>
    </Card>
  );
}

export default async function Project({ params }: PageProps) {
  const { session, auth } = useAuth();
  const [project, setProject] = useState<T.Project>();

  return (
    <>
      {/* <div>{(await params).pjtNo}</div> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
        <span className="text-2xl font-bold">{(await params).pjtNo}</span>
        <ScrollArea className="bg-secondary p-0 rounded-lg flex justify-center items-center col-span-1 lg:col-span-2 2xl:col-span-4 h-[364px]">
          <div className="w-full h-[364px] p-4 flex justify-center items-center">
            <div className="bg-secondary outline-1 outline-primary p-1 rounded-lg w-[1550px] h-full flex justify-center items-center">
              {/* <div className="bg-secondary p-1 rounded-lg w-4 h-4"> */}
              timeline content here
              {/* </div> */}
            </div>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="bg-secondary p-0 rounded-lg col-span-1 lg:col-span-2 2xl:col-span-3">
          <ProjectIdentity />
        </div>
        <div className="bg-secondary p-0 rounded-lg col-span-1">
          <Card className="w-full"></Card>
        </div>
        <div className="bg-secondary p-0 rounded-lg col-span-1 2xl:col-span-2">
          <Card className="w-full"></Card>
        </div>
        <div className="bg-secondary p-0 rounded-lg col-span-1 2xl:col-span-2">
          <Card className="w-full"></Card>
        </div>
      </div>
    </>
  );
}
