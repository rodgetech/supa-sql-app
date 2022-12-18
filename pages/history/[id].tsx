import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import Code from "../../components/Code";
import QueryForm, { FormValues } from "../../components/Form";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const historyId = ctx.query.id as string;

  const supabase = createServerSupabaseClient(ctx);

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
    .select()
    .eq("id", historyId);

  return {
    props: {
      history: data && data[0],
    },
  };
};

export default function HistoryDetails({ history }: { history: any }) {
  const [result, setResult] = useState(history.query_completion);
  const [loading, setLoading] = useState(false);
  const parent = useRef<HTMLDivElement>(null);

  const generateQuery = async (values: FormValues) => {
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    setResult(data.result);
    setLoading(false);
    parent.current && autoAnimate(parent.current);
  };

  return (
    <>
      <div className="grid h-full  grid-cols-2">
        <div className=" border-r border-zinc-800">
          <div className="my-6 p-6">
            <QueryForm
              onSubmit={generateQuery}
              onReset={() => setResult("")}
              initialValues={{
                details: history.query_instructions,
                table: history.tables,
              }}
            />
          </div>
        </div>
        <div>
          <div className="my-6 p-6" ref={parent}>
            {result && !loading && (
              <>
                <h2 className="mb-5 text-xl text-white"></h2>
                <Code sql={result} />
              </>
            )}
            {result && loading && (
              <h2 className="py-6 text-center text-2xl text-zinc-700">
                Generating sql...
              </h2>
            )}
            {!result && (
              <h2 className="py-6 text-center text-2xl text-zinc-700">
                {loading ? "Generating sql..." : "SQL output"}
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
