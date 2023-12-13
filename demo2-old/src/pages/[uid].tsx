import { GetServerSideProps } from 'next';

type Props = { id: string; job: string | null };

const UserIdPage = ({ id, job }: Props) => (
  <div>
    <h1>{id}</h1>
    {job && <p>Job: {job}</p>}
  </div>
);

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const { params, query } = context;
  const userId = params?.uid as string;
  const job = (query?.job as string) || null;

  return {
    props: { id: 'userid-' + userId, job },
  };
};

export default UserIdPage;
