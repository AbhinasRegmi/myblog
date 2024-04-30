import Editor from "@monaco-editor/react";
import { MutableRefObject } from "react";


export const SupportedLanguages = [
    "tsx",
    "typescript",
    "python",
    "c",
    "sql"
] as const;

type SLangType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer S> ? S : never
export type SupportedLanguageType = SLangType<typeof SupportedLanguages>



interface CodeHighlighterProps {
    code: string;
    setCode: (i: string) => void;
    language: SupportedLanguageType;
    isReadonly?: boolean;
}
export function CodeHighlighter(props: CodeHighlighterProps) {

    return (
        <Editor
            key={props.language}
            theme="vs-dark"
            height={'300px'}
            className="py-2 bg-[#1e1e1e]"
            onChange={(d) => props.setCode(d ?? '')}
            options={{
                minimap: {
                    enabled: false
                },
                lineNumbers: "off",
                readOnly: props.isReadonly ?? true,
            }}
            defaultLanguage={props.language}
            defaultValue={props.code}
        />
    )
}