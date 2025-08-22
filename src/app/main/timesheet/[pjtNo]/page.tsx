interface PageProps {
  params: Promise<{ pjtNo: string }>;
}

export default async function Timesheet({ params }: PageProps) {
  return (
    <>
      <div>{(await params).pjtNo}</div>
    </>
  );
}
