import { hl, kw, tx } from "./helpers";
import type { Challenge } from "./types";

export const sqlBypassChallenge: Challenge = {
    id: "injection",
    title: "Injection SQL avancée",
    description: "Contourne cette authentification SQL pour te connecter sans mot de passe.",
    type: "text-input",
    codeLines: [
        [kw("SELECT"), tx(" * "), kw("FROM"), tx(" users")],
        [kw("WHERE"), tx(" username = '"), hl("______"), tx("'")],
        [kw("AND"), tx(" password = 'whatever'")],
    ],
    placeholder: "Payload d'injection...",
    validate: (answer: string) => {
        const v = answer.toLowerCase().replace(/\s+/g, " ").trim();
        return (
            v.includes("' or '1'='1") ||
            v.includes("' or 1=1") ||
            v.includes("'or'1'='1") ||
            v.includes("' or ''='") ||
            v.includes("'--") ||
            v.includes("' --") ||
            v.includes("';--") ||
            v.includes("' or true")
        );
    },
    hint1: "Indice : Comment faire pour que la condition WHERE soit toujours vraie ? Utilise OR...",
    hint2: "Indice 2 : Ferme la quote du username avec ', puis ajoute OR '1'='1 pour rendre la condition toujours vraie. Tu peux aussi utiliser -- pour commenter la suite.",
    hint3: "Réponse : ' OR '1'='1 (ou ' OR 1=1-- ou simplement '--)",
};