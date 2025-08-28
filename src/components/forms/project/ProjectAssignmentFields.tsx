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
import { User } from "@/types/tableTypes";
import { phaseLookUp } from "@/types/lookUp";
import { CreateProjectFormValues } from "@/app/main/projects/create/page";
import { UpdateProjectFormValues } from "@/app/main/projects/[pjtNo]/edit/page";

export function ProjectAssignmentFields({
	form,
	PMs,
	SEs,
	PEs,
}: {
	form: UseFormReturn<CreateProjectFormValues & UpdateProjectFormValues>;
	PMs?: User[];
	SEs?: User[];
	PEs?: User[];
}) {
	const phase = phaseLookUp;
	return (
		<div className="grid grid-cols-1 xl:grid-cols-2 gap-4 w-full">
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
									value={field.value ? String(field.value) : undefined}
								>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select PM" />
									</SelectTrigger>
									<SelectContent>
										{PMs?.map((pm) => (
											<SelectItem key={pm.id} value={String(pm.id)}>
												{pm.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
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
										<SelectValue placeholder="Select SE" />
									</SelectTrigger>
									<SelectContent>
										{SEs?.map((se) => (
											<SelectItem key={se.id} value={se.id.toString()}>
												{se.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
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
										<SelectValue placeholder="Select PM" />
									</SelectTrigger>
									<SelectContent>
										{PEs?.map((pe) => (
											<SelectItem key={pe.id} value={pe.id.toString()}>
												{pe.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
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
										<SelectValue placeholder="Select Current Phase" />
									</SelectTrigger>
									<SelectContent>
										{phase?.map((p) => (
											<SelectItem key={p.id} value={p.id.toString()}>
												{"("}
												{p.phaseCode}
												{") "} {p.phaseName}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>
			</div>
		</div>
	);
}
