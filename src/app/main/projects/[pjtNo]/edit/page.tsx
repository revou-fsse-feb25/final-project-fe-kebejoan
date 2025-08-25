interface PageProps {
  params: Promise<{ pjtNo: string }>;
}

export default async function EditProject({ params }: PageProps) {
  return <div>{(await params).pjtNo}</div>;
}
