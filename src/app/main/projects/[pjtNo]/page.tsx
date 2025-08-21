interface PageProps {
  params: Promise<{ pjtNo: string }>;
}

export default async function Project({ params }: PageProps) {
  return (
    <>
      <div>{(await params).pjtNo}</div>
    </>
  );
}
