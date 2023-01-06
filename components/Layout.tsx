import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { ReactNode } from "react";
import { Quicksand, JetBrains_Mono } from "@next/font/google";
import Head from "next/head";

// If loading a variable font, you don't need to specify the font weight
const quicksand = Quicksand({ subsets: ["latin"] });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  const session = useSession();
  const supabase = useSupabaseClient();

  const signInWithGitHub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  return (
    <>
      <Head>
        <title>SupSqlApp - Turn your words into sql</title>
        <meta
          name="description"
          content="Generated sql queries using human language"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex h-screen flex-col ${quicksand.className}`}>
        <div className="tems-center flex justify-center space-x-6 bg-zinc-800/20 p-3 px-4">
          <div>
            <Link href="/">
              <h3
                className={`text-xl  font-bold tracking-tight text-white ${jetBrainsMono.className}`}
              >
                Supa
                <span className="border-b-2  border-purple-700 text-zinc-300">
                  Sql
                </span>
                App
              </h3>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            {!session && (
              <button
                onClick={signInWithGitHub}
                className="rounded-lg bg-zinc-800 px-6 py-1 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-600"
              >
                Sign in with GitHub
              </button>
            )}
            {session && (
              <button
                onClick={() => supabase.auth.signOut()}
                className="rounded-lg bg-zinc-800 px-6 py-1 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-600"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
        {session && (
          <div className="border-b border-zinc-800 p-2">
            <ul className="flex justify-center space-x-9">
              <li>
                <Link href="/" className="text-zinc-300 hover:text-white">
                  Generate sql
                </Link>
              </li>
              <li>
                <Link
                  href="/history"
                  className="text-zinc-300 hover:text-white"
                >
                  Your history
                </Link>
              </li>
            </ul>
          </div>
        )}
        <div className="h-full">{children}</div>
      </div>
    </>
  );
}
