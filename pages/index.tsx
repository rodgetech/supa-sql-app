import { useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import Code from "../components/Code";
import QueryForm, { FormValues } from "../components/Form";

export default function Home() {
  const [result, setResult] = useState("");
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
            <QueryForm onSubmit={generateQuery} onReset={() => setResult("")} />
          </div>
        </div>
        <div>
          <div className="my-6 p-6" ref={parent}>
            {result && (
              <div>
                <h2 className="mb-5 text-xl text-white">
                  Ta-da! Here&apos;s your sql query
                </h2>
                <Code sql={result} />
              </div>
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
