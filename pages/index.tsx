import Head from "next/head";
import { useState } from "react";
import Code from "../components/Code";
import QueryForm, { FormValues } from "../components/Form";

export default function Home() {
  const [result, setResult] = useState();

  const generateQuery = async (values: FormValues) => {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();

    console.log(data);

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
      <div className="grid grid-cols-2  h-full">
        <div className=" border-r border-zinc-800">
          <div className="my-6 p-6">
            <QueryForm onSubmit={generateQuery} />
          </div>
        </div>
        <div className="">
          <div className="my-6 p-6">
            {result && (
              <>
                <h2 className="text-white text-xl mb-5">
                  Ta-da! Here&apos;s your sql query
                </h2>
                <Code sql={result} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
