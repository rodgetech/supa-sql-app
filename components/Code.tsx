import { format } from "sql-formatter";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";

type Props = {
  sql: string;
  enableClipboard?: boolean;
};

export default function Code({ sql, enableClipboard = true }: Props) {
  const parent = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const code = format(sql);

  const handleCopy = () => {
    setCopied(true);
    parent.current && autoAnimate(parent.current);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      {enableClipboard && (
        <div className="rounded-tl-md rounded-tr-md border-t  border-l border-r border-zinc-800 bg-zinc-800/20 py-1 px-4 text-right text-white">
          <div ref={parent}>
            {!copied && (
              <CopyToClipboard text={code} onCopy={handleCopy}>
                <p className="cursor-pointer text-sm">Copy code</p>
              </CopyToClipboard>
            )}
            {copied ? <p className="ml-2 text-sm">Copied!</p> : null}
          </div>
        </div>
      )}

      <div>
        <SyntaxHighlighter
          language="sql"
          style={atomOneDark}
          customStyle={{
            borderBottomLeftRadius: "0.3rem",
            borderBottomRightRadius: "0.3rem",
            fontSize: 14,
            background: "#18181b",
            padding: 20,
            borderLeft: "1px solid #27272a",
            borderRight: "1px solid #27272a",
            borderBottom: "1px solid #27272a",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
