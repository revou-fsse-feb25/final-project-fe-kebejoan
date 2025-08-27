import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { phaseLookUp } from "@/types/lookUp";
import { DatePickerField } from "../DatePicker";
import { CreateProjectFormValues } from "@/app/main/projects/create/page";
import { UpdateProjectFormValues } from "@/app/main/projects/[pjtNo]/edit/page";

export function ProjectPhaseFields({
	form,
}: {
	form: UseFormReturn<CreateProjectFormValues & UpdateProjectFormValues>;
}) {
	const phase = phaseLookUp;
	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="phase1EndDate"
					render={({ field }) => (
						<DatePickerField
							label="Phase 1 End date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="phase2EndDate"
					render={({ field }) => (
						<DatePickerField
							label="Phase 1 End date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="phase3EndDate"
					render={({ field }) => (
						<DatePickerField
							label="Phase 3 End date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="phase4EndDate"
					render={({ field }) => (
						<DatePickerField
							label="Phase 4 End date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="phase5EndDate"
					render={({ field }) => (
						<DatePickerField
							label="Phase 5 End date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="phase6EndDate"
					render={({ field }) => (
						<DatePickerField
							label="Phase 6 End date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="phase7EndDate"
					render={({ field }) => (
						<DatePickerField
							label="Phase 7 End date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="phase8EndDate"
					render={({ field }) => (
						<DatePickerField
							label="Phase 8 End date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="phase9EndDate"
					render={({ field }) => (
						<DatePickerField
							label="Phase 9 End date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
		</div>
	);
}
