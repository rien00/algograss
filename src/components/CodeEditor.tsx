"use client";

import dynamic from "next/dynamic";
import { java } from "@codemirror/lang-java";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => <textarea className="h-[430px] w-full rounded-lg border border-slate-300 p-4 font-mono text-sm" disabled value="에디터를 불러오는 중입니다..." />,
});

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function CodeEditor({ value, onChange }: Props) {
  return (
    <div className="editor-shell overflow-hidden rounded-lg border border-slate-200 bg-white">
      <CodeMirror value={value} height="430px" extensions={[java()]} basicSetup={{ lineNumbers: true, foldGutter: true }} onChange={onChange} />
    </div>
  );
}
