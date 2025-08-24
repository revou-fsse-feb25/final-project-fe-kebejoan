"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { fetchProgressReportById } from "@/services/api/api.progress";
import * as T from "@/types/tableTypes";
import { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ id: number }>;
}

export default function Progress({ params }: PageProps) {
  const { auth } = useAuth();
  const [progress, setProgress] = useState<T.ProgressReport>();

  useEffect(() => {
    if (auth.isAuth) {
      (async () => {
        const id = (await params).id;
        const data = await fetchProgressReportById(id as number);
        setProgress(data);
      })();
    }
  }, [auth.isAuth]);

  return (
    <>
      <span className="flex gap-2 ">
        <div className="text-2xl font-bold">{progress?.project?.pjtNo}</div>
      </span>
      <div className="w-full py-2">
        <Card className="w-full h-full py-2">
          <CardHeader className="font-bold">
            <CardTitle className="text-2xl">Progress</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="w-full">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-2">
              <div className="font-bold col-span-1">Project Number</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.project?.pjtNo}
              </div>
              <div className="font-bold col-span-1">Project Name</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.project?.pjtName}
              </div>
              <div className="font-bold col-span-1">Phase</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": P"}
                {progress?.pjtPhaseId}
              </div>
              <div className="font-bold col-span-1">Reporter</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.user?.code}
              </div>
              <div className="font-bold col-span-1">This Week's Tasks</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.thisWeekTask}
              </div>
              <div className="font-bold col-span-1">This Week's Issues</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.thisWeekIssue}
              </div>
              <div className="font-bold col-span-1">Next Week Tasks</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.nextWeekTask}
              </div>
              <div className="font-bold col-span-1">Report Date</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.reportDate}
              </div>
              <div className="font-bold col-span-1">Advance Phase</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {progress?.advancePhase ? "Yes" : "No"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
