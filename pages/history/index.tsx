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
    .eq("profile_id", session.user.id)
    .order("created_at", { ascending: false });

  return {
    props: {
      initialSession: session,
      user: session.user,
      history: data ?? [],
    },
  };
};

export default function HistoryList({
  history,
}: {
  user: User;
  history: any[];
}) {
  return (
    <div className="mx-auto mt-6 w-8/12 pb-20">
      <div className="mt-12">
        <h2 className="text-xl text-white">Your history</h2>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
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
