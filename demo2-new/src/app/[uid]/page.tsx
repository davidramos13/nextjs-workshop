type Props = {
  params: { uid: string };
  searchParams: { job?: string };
};

const UserIdPage = async ({ params, searchParams }: Props) => {
  const id = `userid-${params.uid}`;
  const job = searchParams.job || null;
  console.log(`id: ${id} - job: ${job}`);

  return (
    <div>
      <h1>{id}</h1>
      {job && <p>Job: {job}</p>}
    </div>
  );
};

export default UserIdPage;
