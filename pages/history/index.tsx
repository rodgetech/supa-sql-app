import {
  createServerSupabaseClient,
  createBrowserSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Code from "../../components/Code";
import { getRelativeTime } from "../../utils/helpers";

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
  const router = useRouter();
  const supabase = createBrowserSupabaseClient();
  const remove = async (id?: string) => {
    try {
      let delErr: any;
      if (id) {
        const { error } = await supabase
          .from("translation_histories")
          .delete()
          .eq("id", id);
        delErr = error;
      } else {
        const { error } = await supabase
          .from("translation_histories")
          .delete()
          .in(
            "id",
            history.map((h) => h.id)
          );
        delErr = error;
      }
      if (!delErr) router.push("/history");
    } catch (err) {
      console.log("Delete failed", err);
    }
  };

  return (
    <div className="mx-auto mt-6 w-8/12 pb-20">
      <div className="mt-12 flex items-end justify-between">
        <h2 className="text-xl text-white">Your history</h2>
        {history && history.length > 0 && (
          <p
            className="z-50 cursor-pointer text-zinc-500 hover:text-zinc-300"
            onClick={() => remove()}
          >
            Clear all
          </p>
        )}
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          {history.map((h, i) => (
            <div
              className="rounded-md border border-zinc-800 bg-zinc-800/20 p-4 hover:border-zinc-700"
              key={i}
            >
              <Link href={`/history/${h.id}`}>
                <p className="mb-3 text-white">{h.query_instructions}</p>
                <div className="max-h-[150px] overflow-hidden">
                  <Code sql={h.query_completion} enableClipboard={false} />
                </div>
              </Link>
              <div className="mt-4 flex justify-between">
                <p className=" text-sm text-zinc-500">
                  {getRelativeTime(new Date(), new Date(h.created_at))}
                </p>
                <p
                  className="z-50 cursor-pointer text-sm text-zinc-500 hover:text-zinc-300"
                  onClick={() => remove(h.id)}
                >
                  Delete
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
