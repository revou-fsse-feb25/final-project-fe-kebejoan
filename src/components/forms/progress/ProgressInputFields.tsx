import { CreateProgressReportFormValues } from "@/app/main/progress/create/page";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Project } from "@/types/tableTypes";
import { DatePickerField } from "../DatePicker";
import { phaseAdvanceLookUp, phaseLookUp } from "@/types/lookUp";

export function ProgressInputFields({
  form,
  projects,
}: {
  form: UseFormReturn<CreateProgressReportFormValues>;
  projects: Project[];
}) {
  return (
    <div className="col-span-1 xl:col-span-2 space-y-8">
      <FormField
        control={form.control}
        name="userId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>User ID</FormLabel>
            <FormControl>
              <Input type="text" disabled {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="projectId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Project</FormLabel>
            <FormControl>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value ? String(field.value) : undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Project" />
                </SelectTrigger>
                <SelectContent>
                  {projects?.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.pjtName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="pjtPhaseId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Project Phase</FormLabel>
            <FormControl>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={field.value ? String(field.value) : undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Project Phase" />
                </SelectTrigger>
                <SelectContent>
                  {phaseLookUp?.map((p) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.phaseName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="reportDate"
        render={({ field }) => (
          <DatePickerField
            label="Report Date"
            date={field.value ? new Date(field.value) : undefined}
            onChange={field.onChange}
          />
        )}
      />
      <FormField
        control={form.control}
        name="thisWeekTask"
        render={({ field }) => (
          <FormItem>
            <FormLabel>This weeks tasks</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter this week's tasks"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="thisWeekIssue"
        render={({ field }) => (
          <FormItem>
            <FormLabel>This weeks tasks</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter this week's tasks"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nextWeekTask"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Next weeks tasks</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Enter next week's tasks"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="advancePhase"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Advance Phase?</FormLabel>
            <FormControl>
              <Select
                onValueChange={(val) => field.onChange(val === "true")}
                value={field.value ? String(field.value) : undefined}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Advance Phase" />
                </SelectTrigger>
                <SelectContent>
                  {phaseAdvanceLookUp?.map((p) => (
                    <SelectItem key={p.label} value={String(p.value)}>
                      {p.label}
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
  );
}
