import { auth } from 'auth';
import { SignIn } from 'components/SignIn';
import { Button } from 'modules/components/ui/button';

export default async function Home() {
  const session = await auth();
  if (!session) return <SignIn />;

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold underline">Hello world!</h1>
      <Button>Click me</Button>
    </main>
  );
}
