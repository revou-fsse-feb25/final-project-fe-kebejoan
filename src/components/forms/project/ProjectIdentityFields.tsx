import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { CreateProjectFormValues } from "@/app/main/projects/create/page";
import { UpdateProjectFormValues } from "@/app/main/projects/[pjtNo]/edit/page";

export function ProjectIdentityFields({
	form,
}: {
	form: UseFormReturn<CreateProjectFormValues & UpdateProjectFormValues>;
}) {
	return (
		<div className="col-span-1 xl:col-span-2 space-y-8">
			<FormField
				control={form.control}
				name="pjtNo"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Project No</FormLabel>
						<FormControl>
							<Input
								type="text"
								placeholder="Enter project number"
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="pjtName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Project Name</FormLabel>
						<FormControl>
							<Input placeholder="Enter project name" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="epcName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>EPC Name</FormLabel>
						<FormControl>
							<Input placeholder="Enter EPC name" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={form.control}
				name="ownerName"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Owner</FormLabel>
						<FormControl>
							<Input placeholder="Enter Owner name" {...field} />
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
}
