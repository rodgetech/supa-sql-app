import Head from "next/head";
import Code from "../components/Code";

export default function Home() {
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
            <textarea
              name="content"
              rows={12}
              className="w-full bg-zinc-900 text-white outline-none resize-none mb-5"
              placeholder="Place your content here..."
            />
            <button
              type="button"
              className="text-white bg-zinc-800  hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-600 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Summarize
            </button>
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
