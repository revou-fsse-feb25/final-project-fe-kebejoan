import { FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { DatePickerField } from "../DatePicker";
import { CreateProjectFormValues } from "@/app/main/projects/create/page";
import { UpdateProjectFormValues } from "@/app/main/projects/[pjtNo]/edit/page";

export function ProjectDatePickerFields({
	form,
}: {
	form: UseFormReturn<CreateProjectFormValues & UpdateProjectFormValues>;
}) {
	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="timeStart"
					render={({ field }) => (
						<DatePickerField
							label="Start Date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
			<div className="col-span-1">
				<FormField
					control={form.control}
					name="timeEnd"
					render={({ field }) => (
						<DatePickerField
							label="End Date"
							date={field.value ? new Date(field.value) : undefined}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>
		</div>
	);
}
