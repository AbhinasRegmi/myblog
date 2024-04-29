import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import ts from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql";



export const SupportedLanguages = [
    "tsx",
    "ts",
    "python",
    "c/c++",
    "sql"
] as const;

type SLangType <T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer S> ? S : never
export type SupportedLanguageType = SLangType<typeof SupportedLanguages>

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('ts', ts);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('c/c++', cpp);
SyntaxHighlighter.registerLanguage('sql', sql);

interface CodeHighlighterProps {
    code: string;
    language: SupportedLanguageType;
}
export function CodeHighlighter(props: CodeHighlighterProps){

    return (
        <SyntaxHighlighter style={a11yDark} language={props.language}>
            {props.code}
        </SyntaxHighlighter>
    )
}