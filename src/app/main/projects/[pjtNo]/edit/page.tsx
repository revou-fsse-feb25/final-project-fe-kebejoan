"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
	createProject,
	fetchProjectByPjtNo,
	updateProject,
} from "@/services/api/api.projects";
import { createProjectSchema, updateProjectSchema } from "@/types/schemas";
import { useProjectUsers } from "@/hooks/useProjectUsers";
import { useAuth } from "@/hooks/useAuth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { ProjectIdentityFields } from "@/components/forms/project/ProjectIdentityFields";
import { ProjectAssignmentFields } from "@/components/forms/project/ProjectAssignmentFields";
import { ProjectPhaseFields } from "@/components/forms/project/ProjectPhaseFields";
import { ProjectDatePickerFields } from "@/components/forms/project/ProjectDatePickerFields";
import { Separator } from "@/components/ui/separator";
import { ExecutionStatus } from "@/types/tableTypes";
import { UserRole } from "@/types/tableTypes";
import { useEffect, useState } from "react";
import { Project } from "@/types/tableTypes";
import { CreateProjectFormValues } from "../../create/page";

export type UpdateProjectFormValues = z.infer<typeof updateProjectSchema>;

interface PageProps {
	params: Promise<{ pjtNo: string }>;
}

export default function EditProject({ params }: PageProps) {
	const router = useRouter();
	const { session, auth } = useAuth();
	const { PMs, SEs, PEs } = useProjectUsers(auth);
	const [project, setProject] = useState<Project>();

	useEffect(() => {
		if (auth.isAuth) {
			(async () => {
				const pjtNo = (await params).pjtNo;
				const data = await fetchProjectByPjtNo(pjtNo);
				setProject(data);
			})();
			setProject(project);
		}
	}, [auth.isAuth]);

	const form = useForm<CreateProjectFormValues>({
		//TODO: Still incorrect typing
		resolver: zodResolver(createProjectSchema), //TODO: Still incorrect typing
		defaultValues: {
			pjtNo: project?.pjtNo,
			pjtName: project?.pjtName,
			epcName: project?.epcName,
			ownerName: project?.ownerName,
			assignedPMId: project?.assignedPMId,
			assignedPEId: project?.assignedPEId,
			assignedSEId: project?.assignedSEId,
			currentPhaseId: project?.currentPhaseId,
			executionStatus: project?.executionStatus,
			timeStart: project?.timeStart,
			timeEnd: project?.timeEnd,
			phase1EndDate: project?.phase1EndDate,
			phase2EndDate: project?.phase2EndDate,
			phase3EndDate: project?.phase3EndDate,
			phase4EndDate: project?.phase4EndDate,
			phase5EndDate: project?.phase5EndDate,
			phase6EndDate: project?.phase6EndDate,
			phase7EndDate: project?.phase7EndDate,
			phase8EndDate: project?.phase8EndDate,
			phase9EndDate: project?.phase9EndDate,
		},
	});

	const onSubmit = async (values: UpdateProjectFormValues) => {
		try {
			if (project === undefined) {
				toast.error("Project is not found");
				return;
			}
			const res = await updateProject(project?.id, values);
			if (!res) {
				toast.error("Project Creation Failed");
			} else {
				toast.success("Project Created Successfully!");
				router.push(`/main/projects/${values.pjtNo}`);
			}
		} catch (err) {
			toast.error("Failed to create project");
		}
	};

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-2xl font-bold mb-6">Create New Project</h1>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="gap-4 w-full flex flex-col"
				>
					<ProjectIdentityFields form={form} />
					<ProjectAssignmentFields form={form} PMs={PMs} SEs={SEs} PEs={PEs} />
					<ProjectDatePickerFields form={form} />
					<span className="mt-4 text-xl font-bold">Phase's Date</span>
					<Separator />
					<ProjectPhaseFields form={form} />

					<Button type="submit" className="w-full col-span-1 ">
						Create Project
					</Button>
				</form>
			</Form>
		</div>
	);
}
