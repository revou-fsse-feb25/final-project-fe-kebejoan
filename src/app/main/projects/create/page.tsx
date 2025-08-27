"use client";

import { createProjectSchema } from "@/types/schemas";
import { ExecutionStatus, UserRole } from "@/types/tableTypes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import * as T from "@/types/tableTypes";
import { fetchUsers } from "@/services/api/api.users";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "sonner";
import { createProject } from "@/services/api/api.projects";
import { useRouter } from "next/navigation";

interface mockPhase {
  id: number;
  label: string;
  value: string;
}

function getPhase(): mockPhase[] {
  //TODO: need endpoint to fetch project Phases
  return [
    {
      id: 1,
      label: "Phase 1",
      value: "Phase 1",
    },
    {
      id: 2,
      label: "Phase 2",
      value: "Phase 2",
    },
    {
      id: 3,
      label: "Phase 3",
      value: "Phase 3",
    },
  ];
}

type PhaseKey = `phase${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}EndDate`;

export default function CreateProject() {
  const router = useRouter();
  const { session, auth } = useAuth();
  const [PMs, setPMs] = useState<T.User[]>();
  const [SEs, setSEs] = useState<T.User[]>();
  const [PEs, setPEs] = useState<T.User[]>();
  const [phases, setPhases] = useState<mockPhase[]>();
  const [dateStart, setDateStart] = useState<Date | undefined>();
  const [openStart, setOpenStart] = useState(false);
  const [dateEnd, setDateEnd] = useState<Date | undefined>();
  const [openEnd, setOpenEnd] = useState(false);
  const [datePhase, setDatePhase] = useState<(Date | undefined)[]>(
    Array(10).fill(undefined)
  );
  const [openPhase, setOpenPhase] = useState<boolean[]>(Array(10).fill(false));
  const isPM = session?.user.role === UserRole.PM;
  const phasesIDs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    if (!auth.isAuth) {
      (async () => {
        const PMs = await fetchUsers(); //TODO: Should be fetchAllPM. No BE endpoint yet
        setPMs(PMs);
        const SEs = await fetchUsers(); //TODO: Should be fetchAllSE. No BE endpoint yet
        setSEs(SEs);
        const PEs = await fetchUsers(); //TODO: Should be fetchAllPE. No BE endpoint yet
        setPEs(PEs);
        const phases = getPhase(); //TODO: Should be fetchAllPhases. No BE endpoint yet
        setPhases(phases);
      })();
    }
  }, [auth.isAuth]);

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      pjtNo: "",
      pjtName: "",
      epcName: "",
      ownerName: "",
      assignedPMId: isPM ? session?.user.id : undefined,
      assignedPEId: undefined,
      assignedSEId: undefined,
      currentPhaseId: 1,
      executionStatus: ExecutionStatus.ONTRACK,
      timeStart: undefined,
      timeEnd: undefined,
      phase1EndDate: undefined,
      phase2EndDate: undefined,
      phase3EndDate: undefined,
      phase4EndDate: undefined,
      phase5EndDate: undefined,
      phase6EndDate: undefined,
      phase7EndDate: undefined,
      phase8EndDate: undefined,
      phase9EndDate: undefined,
    },
  });

  console.log("form state errors:", form.formState.errors);

  const onSubmit = async (values: z.infer<typeof createProjectSchema>) => {
    const res = await createProject(values);
    if (!res) {
      toast.error("Project Creation Failed");
    } else {
      toast.success("Project Created Successfully!");
      router.push(`/main/projects/${values.pjtNo}`);
    }
  };

  return (
    <div className="bg-secondary w-full rounded-lg p-1">
      <Card>
        <CardHeader className="font-bold">
          <CardTitle className="text-xl">Create A Project</CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              // className="space-y-8 grid grid-cols-1 xl:grid-cols-2 gap-x-4"
            >
              <div className="space-y-8 grid grid-cols-1 xl:grid-cols-2 gap-x-4">
                <div className="col-span-1 xl:col-span-2">
                  <FormField
                    control={form.control}
                    name="pjtNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Number</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Project Number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1 xl:col-span-2">
                  <FormField
                    control={form.control}
                    name="pjtName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Project Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1 xl:col-span-2">
                  <FormField
                    control={form.control}
                    name="epcName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>EPC Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="EPC Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1 xl:col-span-2">
                  <FormField
                    control={form.control}
                    name="ownerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Owner Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Owner Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="assignedPMId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign PM</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(val) => field.onChange(Number(val))}
                            value={field.value?.toString()}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a PM" />
                            </SelectTrigger>
                            <SelectContent className="h-52">
                              {PMs?.map((pm) => (
                                <SelectItem
                                  key={pm.id}
                                  value={pm.id.toString()}
                                >
                                  {pm.name}, {""}
                                  {pm.code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="assignedSEId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign SE</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(val) => field.onChange(Number(val))}
                            value={field.value?.toString()}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select an SE" />
                            </SelectTrigger>
                            <SelectContent className="h-52">
                              {SEs?.map((se) => (
                                <SelectItem
                                  key={se.id}
                                  value={se.id.toString()}
                                >
                                  {se.name}, {""}
                                  {se.code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="assignedPEId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Assign PE</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(val) => field.onChange(Number(val))}
                            value={field.value?.toString()}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a PE" />
                            </SelectTrigger>
                            <SelectContent className="h-52">
                              {PEs?.map((pe) => (
                                <SelectItem
                                  key={pe.id}
                                  value={pe.id.toString()}
                                >
                                  {pe.name}, {""}
                                  {pe.code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="currentPhaseId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Phase</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(val) => field.onChange(Number(val))}
                            value={field.value?.toString()}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select the current phase" />
                            </SelectTrigger>
                            <SelectContent className="h-52">
                              {phases?.map((p) => (
                                <SelectItem key={p.id} value={p.id.toString()}>
                                  {p.label}, {""}
                                  {p.value}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="timeStart"
                    render={({ field }) => (
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="date" className="px-1">
                          Start Date
                        </Label>
                        <Popover open={openStart} onOpenChange={setOpenStart}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="dateStart"
                              className="w-full justify-between font-normal"
                            >
                              {dateStart
                                ? format(dateStart, "dd/MM/yyyy")
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="end"
                          >
                            <Calendar
                              mode="single"
                              selected={dateStart}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setDateStart(date);
                                setOpenStart(false);
                                field.onChange(date);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  />
                </div>
                <div className="col-span-1">
                  <FormField
                    control={form.control}
                    name="timeEnd"
                    render={({ field }) => (
                      <div className="flex flex-col gap-3">
                        <Label htmlFor="date" className="px-1">
                          End Date
                        </Label>
                        <Popover open={openEnd} onOpenChange={setOpenEnd}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="dateEnd"
                              className="w-full justify-between font-normal"
                            >
                              {dateEnd
                                ? format(dateEnd, "dd/MM/yyyy")
                                : "Select date"}
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="end"
                          >
                            <Calendar
                              mode="single"
                              selected={dateEnd}
                              captionLayout="dropdown"
                              onSelect={(date) => {
                                setDateEnd(date);
                                setOpenEnd(false);
                                field.onChange(date);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}
                  />
                </div>
                <div className="col-span-full text-xl">
                  <span className="font-semibold ">Phase's Date</span>
                  <Separator className="" />
                </div>
                {phasesIDs.map((p) => {
                  const key = `phase${p}EndDate` as PhaseKey;
                  return (
                    <div key={p} className="col-span-1">
                      <FormField
                        control={form.control}
                        name={key}
                        render={({ field }) => (
                          <div className="flex flex-col gap-3">
                            <Label htmlFor="date" className="px-1">
                              {`Phase ${p} End Date`}
                            </Label>
                            <Popover
                              open={openPhase[p]}
                              onOpenChange={(isOpen) =>
                                setOpenPhase((prev) => {
                                  const copy = [...prev];
                                  copy[p] = isOpen;
                                  return copy;
                                })
                              }
                            >
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  id={`phase${p}EndDate`}
                                  className="w-full justify-between font-normal"
                                >
                                  {datePhase[p]
                                    ? format(datePhase[p], "dd/MM/yyyy")
                                    : "Select date"}
                                  <ChevronDownIcon />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto overflow-hidden p-0"
                                align="end"
                              >
                                <Calendar
                                  mode="single"
                                  selected={datePhase[p]}
                                  captionLayout="dropdown"
                                  onSelect={(newDate) => {
                                    setDatePhase((prev) => {
                                      const copy = [...prev];
                                      copy[p] = newDate ?? undefined;
                                      return copy;
                                    });
                                    setOpenPhase((prev) => {
                                      const copy = [...prev];
                                      copy[p] = false;
                                      return copy;
                                    });
                                    field.onChange(newDate);
                                  }}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        )}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="col-span-full flex justify-end">
                <CardAction>
                  <Button type="submit" className="cursor-pointer">
                    Create Project
                  </Button>
                </CardAction>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
