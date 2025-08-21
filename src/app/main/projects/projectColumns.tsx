import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Project } from "@/types/tableTypes";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "pjtNo",
    header: "Project No",
    id: "link-pjtNo",
    cell: ({ row }) => (
      <Link href={`projects/${row.original.pjtNo}`}>{row.original.pjtNo}</Link>
    ),
  },
  {
    accessorKey: "pjtName",
    header: "Project Name",
    id: "link-pjtName",
    cell: ({ row }) => (
      <Link href={`projects/${row.original.pjtNo}`}>
        {row.original.pjtName}
      </Link>
    ),
  },
  {
    accessorKey: "epcName",
    header: "EPC",
    id: "link-epcName",
    cell: ({ row }) => (
      <Link href={`projects/${row.original.pjtNo}`}>
        {row.original.epcName}
      </Link>
    ),
  },
  {
    accessorKey: "ownerName",
    header: "Owner",
    id: "link-ownerName",
    cell: ({ row }) => (
      <Link href={`projects/${row.original.pjtNo}`}>
        {row.original.ownerName}
      </Link>
    ),
  },
  {
    accessorKey: "currentPhase",
    header: "Phase",
    id: "link-pjtPhase",
    cell: ({ row }) => (
      <Link href={`projects/${row.original.pjtNo}`}>
        {row.original.currentPhase?.phaseName}
      </Link>
    ),
  },
  {
    accessorKey: "pjtStatus",
    header: "Status",
    id: "link-pjtStatus",
    cell: ({ row }) => (
      <Link href={`projects/${row.original.pjtNo}`}>
        {row.original.executionStatus}
      </Link>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    id: "link-startDate",
    cell: ({ row }) => {
      const date = row.original.timeStart
        ? new Date(row.original.timeStart).toLocaleDateString("en-GB")
        : "-";

      return <Link href={`projects/${row.original.pjtNo}`}>{date}</Link>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    id: "link-endDate",
    cell: ({ row }) => {
      const date = row.original.timeEnd
        ? new Date(row.original.timeEnd).toLocaleDateString("en-GB")
        : "-";

      return <Link href={`projects/${row.original.pjtNo}`}>{date}</Link>;
    },
  },
];
