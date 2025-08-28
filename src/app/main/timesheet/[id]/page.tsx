"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { fetchTimesheetById } from "@/services/api/api.timesheet";
import * as T from "@/types/tableTypes";
import { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ id: number }>;
}

export default function Timesheet({ params }: PageProps) {
  const { auth } = useAuth();
  const [timesheet, setTimesheet] = useState<T.TimesheetReport>();

  useEffect(() => {
    if (auth.isAuth) {
      (async () => {
        const id = (await params).id;
        const data = await fetchTimesheetById(id as number);
        setTimesheet(data);
      })();
    }
  }, [auth.isAuth, params]);

  return (
    <>
      <span className="flex gap-2 ">
        <div className="text-2xl font-bold">{timesheet?.project?.pjtNo}</div>
      </span>
      <div className="w-full py-2">
        <Card className="w-full h-full py-2">
          <CardHeader className="font-bold">
            <CardTitle className="text-2xl">Timesheet</CardTitle>
            <Separator />
          </CardHeader>
          <CardContent className="w-full">
            <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-2">
              <div className="font-bold col-span-1">Project Number</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {timesheet?.project?.pjtNo}
              </div>
              <div className="font-bold col-span-1">Project Name</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {timesheet?.project?.pjtName}
              </div>
              <div className="font-bold col-span-1">Phase</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": P"}
                {timesheet?.pjtPhaseId}
              </div>
              <div className="font-bold col-span-1">Reporter</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {timesheet?.user?.code}
              </div>
              <div className="font-bold col-span-1">Hours Per Day</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {timesheet?.hoursPerDay}
              </div>
              <div className="font-bold col-span-1">Report Date</div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 2xl:col-span-6 text-wrap">
                {": "}
                {timesheet?.reportDate}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
