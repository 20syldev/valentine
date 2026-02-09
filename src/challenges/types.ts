export type CodeTokenType = "keyword" | "string" | "comment" | "function" | "highlight" | "text";

export interface CodeToken {
    text: string;
    type: CodeTokenType;
}

export type CodeLine = CodeToken[];

export interface Challenge {
    id: string;
    title: string;
    description: string;
    type: "text-input" | "multiple-choice" | "firewall";
    codeLines: CodeLine[];
    options?: { key: string; label: string }[];
    packets?: { src: string; dst: string; payload: string; allow: boolean }[];
    validate: (answer: string) => boolean;
    hint1: string;
    hint2: string;
    hint3: string;
    placeholder?: string;
}