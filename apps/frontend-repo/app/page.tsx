import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export default async function Home() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;

  if (!token) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1> This is main page </h1>
      </main>
    </div>
  );
}
