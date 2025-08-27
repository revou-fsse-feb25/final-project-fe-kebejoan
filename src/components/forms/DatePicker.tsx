"use client";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

export function DatePickerField({
	label,
	date,
	onChange,
}: {
	label: string;
	date?: Date;
	onChange: (date: Date | undefined) => void;
}) {
	const [open, setOpen] = useState(false);

	return (
		<div className="flex flex-col gap-3">
			<label className="px-1">{label}</label>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="w-full justify-between font-normal"
					>
						{date ? format(date, "dd/MM/yyyy") : "Select date"}
						<ChevronDownIcon />
					</Button>
				</PopoverTrigger>
				<PopoverContent align="end" className="w-auto p-0">
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						onSelect={(d) => {
							setOpen(false);
							onChange(d ?? undefined);
						}}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
}
