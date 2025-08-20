"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { columns } from "./projectColumns";
import { DataTable } from "./projectDataTable";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserRole, Project } from "@/types/tableTypes";
import { getMyProjects } from "@/services/api/api.users-me";

async function getProjects(role: UserRole): Promise<Project[]> {
	if (role === UserRole.ADMIN) {
		const fetchProjects = getMyProjects();
		return fetchProjects;
	} else {
		const fetchProjects = getMyProjects(); //should have for highlighted project endpoint
		return fetchProjects;
	}
}

export default function Dashboard() {
	// change to async function after API fetch implementation
	const { data: session, status } = useSession();
	const [projects, setProjects] = useState<Project[]>([]);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		if (status === "unauthenticated") {
			setIsAdmin(false);
			setIsAuth(false);
		} else if (status === "authenticated") {
			if (session.user.role === UserRole.ADMIN) {
				setIsAdmin(true);
			}
			setIsAuth(true);
		}
		if (status === "loading") {
			setIsLoading(true);
		} else {
			setIsLoading(false);
		}
	}, [status]);

	const loadProjects = async () => {
		try {
			const data = await getProjects(session?.user.role as UserRole);
			setProjects(data);
		} catch (err) {
			console.error("Error fetching projects:", err);
		}
	};

	useEffect(() => {
		if (isAuth) {
			loadProjects();
		}
	}, [isAuth]);

	if (isLoading) {
		return (
			<div className="animate-pulse">
				<div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 w-full">
					<div className="bg-secondary rounded-lg p-4 col-span-3"></div>
					<div className="bg-secondary rounded-lg p-4 col-span-1"></div>
					<div className="bg-secondary rounded-lg p-4 col-span-2"></div>
					<div className="bg-secondary rounded-lg p-4"></div>
					<div className="bg-secondary rounded-lg p-4"></div>
					<div className="bg-secondary rounded-lg p-4"></div>
				</div>
			</div>
		);
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
