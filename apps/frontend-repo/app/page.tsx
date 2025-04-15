import DataTable from '@components/user/table';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <DataTable />
      </main>
    </div>
  );
}
