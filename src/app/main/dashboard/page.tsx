"use client";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";

import { Project, columns } from "./projectColumns";
import { DataTable } from "./projectDataTable";
import { useSession } from "next-auth/react";

function getProjects(): Project[] {
	//change to real getProjects data from API (async)
	return [
		{
			pjtNo: "P001",
			pjtName: "Project 1",
			pjtPhase: "Phase 1",
			pjtStatus: "ONTRACK",
		},
		{
			pjtNo: "P002",
			pjtName: "Project 2",
			pjtPhase: "Phase 2",
			pjtStatus: "LEADING",
		},
		{
			pjtNo: "P003",
			pjtName: "Project 3",
			pjtPhase: "Phase 3",
			pjtStatus: "LAGGING",
		},
	];
}

export default function Dashboard() {
	// change to async function after API fetch implementation
	const isAdmin = true; // Replace with your authentication logic
	const projects = getProjects(); // Replace with await getProjects()
	const { data: session, status } = useSession();
	console.log("data session:", session);

	if (status === "loading") {
		console.log("loading session:", session);
		return <p>Loading . . .</p>;
	}

	if (status === "unauthenticated") {
		console.log("unauthenticated session:", session);
		return <p>Not authenticated..., redirecting</p>;
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
			<div className="rounded-lg col-span-3">
				<Card>
					<CardHeader className="font-bold">Highlighted Project</CardHeader>
					<CardContent>
						<DataTable data={projects} columns={columns} />
					</CardContent>
				</Card>
			</div>
			<div className="bg-secondary rounded-lg col-span-1">
				<Card className="h-full">
					<CardHeader className="font-bold">
						{isAdmin ? "Highest Load" : "Current Load"}
					</CardHeader>
					<CardContent>{session?.user?.code}</CardContent>
				</Card>
			</div>
			<div className="bg-secondary rounded-lg col-span-2"></div>
			<div className="bg-secondary rounded-lg"></div>
			<div className="bg-secondary rounded-lg"></div>
			<div className="bg-secondary rounded-lg p-0"></div>
		</div>
	);
}
