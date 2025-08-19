import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export type Project = {
  // id: number;
  pjtNo: string;
  pjtName: string;
  pjtPhase: string;
  pjtStatus: "ONTRACK" | "LEADING" | "LAGGING";
  assignedPM: string;
  assignedPE: string;
  assignedSE: string;
};

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
        {row.original.pjtPhase}
      </Link>
    ),
  },
  {
    accessorKey: "pjtStatus",
    header: "Status",
    id: "link-pjtStatus",
    cell: ({ row }) => (
      <Link href={`/project/${row.original.pjtNo}`}>
        {row.original.pjtStatus}
      </Link>
    ),
  },
  {
    accessorKey: "assignedPM",
    header: "PM",
    id: "link-assignedPM",
    cell: ({ row }) => (
      <Link href={`/project/${row.original.pjtNo}`}>
        {row.original.assignedPM}
      </Link>
    ),
  },
  {
    accessorKey: "assignedPE",
    header: "PE",
    id: "link-assignedPE",
    cell: ({ row }) => (
      <Link href={`/project/${row.original.pjtNo}`}>
        {row.original.assignedPE}
      </Link>
    ),
  },
  {
    accessorKey: "assignedSE",
    header: "SE",
    id: "link-assignedSE",
    cell: ({ row }) => (
      <Link href={`/project/${row.original.pjtNo}`}>
        {row.original.assignedSE}
      </Link>
    ),
  },
];
