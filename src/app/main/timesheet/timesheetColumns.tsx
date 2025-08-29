import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { TimesheetReport } from "@/types/tableTypes";

export const columns: ColumnDef<TimesheetReport>[] = [
	{
		// accessorKey: "pjtNo",
		accessorFn: (row) => row.project?.pjtNo,
		header: "Project No",
		id: "link-pjtNo",
		cell: ({ row }) => (
			<Link href={`timesheet/${row.original.id}`}>
				{row.original.project?.pjtNo}
			</Link>
		),
	},
	{
		accessorKey: "pjtPhase",
		header: "Phase",
		id: "link-pjtPhase",
		cell: ({ row }) => (
			<Link href={`timesheet/${row.original.id}`}>
				{row.original.phase?.phaseCode}
			</Link>
		),
	},
	{
		accessorKey: "hoursPerDay",
		header: "Hours/Day",
		id: "link-hoursPerDay",
		cell: ({ row }) => (
			<Link href={`timesheet/${row.original.id}`}>
				{row.original.hoursPerDay.toString()}
			</Link>
		),
	},
	{
		accessorKey: "reportDate",
		header: "Report Date",
		id: "link-reportDatet",
		cell: ({ row }) => {
			const date = row.original.reportDate
				? new Date(row.original.reportDate).toLocaleDateString("en-GB")
				: "-";

			return <Link href={`timesheet/${row.original.id}`}>{date}</Link>;
		},
	},
];
