import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ProgressReport } from "@/types/tableTypes";

export const columns: ColumnDef<ProgressReport>[] = [
	{
		// accessorKey: "projectNo",
		accessorFn: (row) => row.project?.pjtNo,
		header: "Project No",
		id: "link-pjtNo",
		cell: ({ row }) => (
			<Link href={`progress/${row.original.id}`}>
				{row.original.project?.pjtNo}
			</Link>
		),
	},
	{
		accessorKey: "pjtName",
		header: "Project Name",
		id: "link-pjtName",
		cell: ({ row }) => (
			<Link href={`progress/${row.original.id}`}>
				{row.original.project?.pjtName}
			</Link>
		),
	},
	{
		accessorKey: "pmCode",
		header: "PM",
		id: "link-pmCode",
		cell: ({ row }) => (
			<Link href={`progress/${row.original.id}`}>
				{row.original.project?.assignedPM?.code}
			</Link>
		),
	},
	{
		accessorKey: "pjtPhase",
		header: "Phase",
		id: "link-pjtPhase",
		cell: ({ row }) => (
			<Link href={`progress/${row.original.id}`}>
				{row.original.phase?.phaseCode}
			</Link>
		),
	},
	{
		accessorKey: "advPhase",
		header: "Phase Advance",
		id: "link-advPhase",
		cell: ({ row }) => (
			<Link href={`progress/${row.original.id}`}>
				{row.original.advancePhase ? "Yes" : "No"}
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

			return <Link href={`progress/${row.original.id}`}>{date}</Link>;
		},
	},
];
