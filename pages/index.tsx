import Head from "next/head";
import { useState } from "react";
import Code from "../components/Code";
import QueryForm, { FormValues } from "../components/Form";

export default function Home() {
  const [result, setResult] = useState("");

  const generateQuery = async (values: FormValues) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    setResult(data.result);
  };

  return (
    <>
      <Head>
        <title>Welcome</title>
        <meta
          name="description"
          content="Generated sql queries using human language"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid h-full  grid-cols-2">
        <div className=" border-r border-zinc-800">
          <div className="my-6 p-6">
            <QueryForm onSubmit={generateQuery} onReset={() => setResult("")} />
          </div>
        </div>
        <div>
          <div className="my-6 p-6">
            {result && (
              <>
                <h2 className="mb-5 text-xl text-white">
                  Ta-da! Here&apos;s your sql query
                </h2>
                <Code sql={result} />
              </>
            )}
            {!result && (
              <h2 className="py-6 text-center text-2xl text-zinc-700">
                SQL output
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
