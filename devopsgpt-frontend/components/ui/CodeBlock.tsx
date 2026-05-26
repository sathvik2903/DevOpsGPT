"use client";

import ReactMarkdown from "react-markdown";

import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import {
  oneDark
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({
  code
}: any) {

  return (

    <div className="max-h-[700px] overflow-auto">

      <ReactMarkdown

        components={{

          code(props: any) {

            const {
              children
            } = props;

            return (

              <SyntaxHighlighter
                style={oneDark}
                language="bash"
                PreTag="div"
              >

                {
                  String(children)
                }

              </SyntaxHighlighter>

            );

          }

        }}

      >

        {code}

      </ReactMarkdown>

    </div>

  );
}