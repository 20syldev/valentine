import { cmt, kw, str, tx } from "./helpers";
import type { Challenge } from "./types";

export const xssChallenge: Challenge = {
    id: "xss",
    title: "Protège mon coeur",
    description: "Pour éviter une injection XSS, comment encoder '<script>' en HTML ?",
    type: "multiple-choice",
    codeLines: [
        [cmt("// Input utilisateur malveillant:")],
        [kw("const"), tx(" userInput = "), str("\"<script>alert('hack')</script>\""), tx(";")],
        [tx("")],
    ],
    options: [
        { key: "A", label: "&lt;script&gt;" },
        { key: "B", label: "%3Cscript%3E" },
        { key: "C", label: "\\<script\\>" },
    ],
    validate: (answer: string) => answer === "A",
    hint1: "Indice : Les HTML entities commencent par & et finissent par ;",
    hint2: "Indice 2 : < devient &lt; et > devient &gt; en HTML entities (le 't' c'est pour 'less than' / 'greater than')",
    hint3: "Réponse : A (&lt;script&gt;)",
};