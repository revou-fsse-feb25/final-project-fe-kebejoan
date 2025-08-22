interface PageProps {
  params: Promise<{ pjtNo: string }>;
}

export default async function Progress({ params }: PageProps) {
  return (
    <>
      <div>{(await params).pjtNo}</div>
    </>
  );
}
