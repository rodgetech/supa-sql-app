import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const session = useSession();
  const supabase = useSupabaseClient();

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="tems-center flex justify-center space-x-6 bg-zinc-800/20 p-3 px-4">
        <div>
          <Link href="/">
            <h3 className="text-2xl font-bold text-white">Supa Sql App</h3>
          </Link>
        </div>
        <div className="flex-none">
          {!session && (
            <button
              onClick={signInWithGitHub}
              className="rounded-lg bg-zinc-800  px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-600"
            >
              Sign in with GitHub
            </button>
          )}
          {session && (
            <button
              onClick={() => supabase.auth.signOut()}
              className="rounded-lg bg-zinc-800  px-6 py-2 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-600"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}
