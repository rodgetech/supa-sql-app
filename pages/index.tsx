import Head from "next/head";
import Code from "../components/Code";
import QueryForm, { FormValues } from "../components/Form";

export default function Home() {
  const generateQuery = (values: FormValues) => {};

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
      <div className="flex flex-1 h-full">
        <div className="flex-1 border-r border-zinc-800">
          <div className="my-6 p-6">
            <QueryForm onSubmit={generateQuery} />
          </div>
        </div>
        <div className="flex-1">
          <div className="my-6 p-6">
            <h2 className="text-white text-xl mb-5">
              Ta-da! Here&apos;s your sql query
            </h2>
            <Code />
          </div>
        </div>
      </div>
    </>
  );
}
