import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex p-3 tems-center justify-center px-4 bg-zinc-800/20 space-x-6">
        <div>
          <h3 className="text-white text-2xl font-bold">Supa Sql Generator</h3>
        </div>
        <div className="flex-none">
          <button
            type="button"
            className="text-white bg-zinc-800  hover:bg-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-600 font-medium rounded-lg text-sm px-6 py-2"
          >
            Sign in or Register
          </button>
        </div>
      </div>
      <div className="h-full">{children}</div>
    </div>
  );
}
