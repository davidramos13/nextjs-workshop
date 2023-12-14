import write from '@/actions/write';

export default async function Home() {
  return (
    <div className="m-4 w-40">
      <form action={write} className="flex flex-col gap-2">
        <input name="value" type="text" className="border rounded p-1" />
        <button type="submit" className="p-1 bg-blue-200 hover:bg-blue-400 cursor-pointer">
          Write to Log
        </button>
      </form>
    </div>
  );
}
