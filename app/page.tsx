import { auth } from 'auth';
import { SignIn } from 'components/SignIn';

export default async function Home() {
  const session = await auth();
  if (!session) return <SignIn />;

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      ✅Hi
    </main>
  );
}
