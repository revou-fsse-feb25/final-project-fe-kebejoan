import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Project } from "@/types/tableTypes";

export const columns: ColumnDef<Project>[] = [
	{
		accessorKey: "pjtNo",
		header: "Project No",
		id: "link-pjtNo",
		cell: ({ row }) => (
			<Link href={`/project/${row.original.pjtNo}`}>{row.original.pjtNo}</Link>
		),
	},
	{
		accessorKey: "pjtName",
		header: "Project Name",
		id: "link-pjtName",
		cell: ({ row }) => (
			<Link href={`/project/${row.original.pjtNo}`}>
				{row.original.pjtName}
			</Link>
		),
	},
	{
		accessorKey: "pjtPhase",
		header: "Phase",
		id: "link-pjtPhase",
		cell: ({ row }) => (
			<Link href={`/project/${row.original.pjtNo}`}>
				{row.original.currentPhase?.phaseCode}
			</Link>
		),
	},
	{
		accessorKey: "pjtStatus",
		header: "Status",
		id: "link-pjtStatus",
		cell: ({ row }) => (
			<Link href={`/project/${row.original.pjtNo}`}>
				{row.original.executionStatus}
			</Link>
		),
	},
];
