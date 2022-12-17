import { format } from "sql-formatter";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";

const exampleCode = `
SELECT 
*
FROM 
listings
WHERE 
geohash = "hash"
AND LOWER(name) LIKE  LOWER("listing")
ORDER BY 
distance;
`;

export default function Code() {
  const parent = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const code = format(exampleCode);

  const handleCopy = () => {
    setCopied(true);
    parent.current && autoAnimate(parent.current);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div>
      <div className="bg-zinc-800/20 py-1 px-4  text-white rounded-tl-md rounded-tr-md text-right border-t border-l border-r border-zinc-800">
        <div ref={parent}>
          {!copied && (
            <CopyToClipboard text={code} onCopy={handleCopy}>
              <p className="text-sm cursor-pointer">Copy code</p>
            </CopyToClipboard>
          )}
          {copied ? <p className="text-sm ml-2">Copied!</p> : null}
        </div>
      </div>
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
