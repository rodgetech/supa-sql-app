import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import Code from "../../components/Code";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const { data } = await supabase
    .from("translation_histories")
    .select("*")
    .eq("profile_id", session.user.id);

  return {
    props: {
      initialSession: session,
      user: session.user,
      history: data ?? [],
    },
  };
};

export default function History({ history }: { user: User; history: any[] }) {
  console.log(history);
  return (
    <div className="mx-auto my-6 w-8/12">
      <div className="mt-12">
        <h2 className="text-xl text-white">Your history</h2>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-4">
          {history.map((h, i) => (
            <Link href={`/history/${h.id}`} key={i}>
              <div className="rounded-md border border-zinc-800 bg-zinc-800/20 p-4 hover:border-zinc-700">
                <p className="mb-3 text-white">{h.query_instructions}</p>
                <div className="max-h-[150px] overflow-hidden">
                  <Code sql={h.query_completion} enableClipboard={false} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
