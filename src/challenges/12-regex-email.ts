import { cmt, hl, kw, tx } from "./helpers";
import type { Challenge } from "./types";

export const regexChallenge: Challenge = {
    id: "regex",
    title: "Regex de l'amour",
    description: "Écris une regex simple qui valide un email (lettres minuscules, @, domaine.ext).",
    type: "text-input",
    codeLines: [
        [cmt("// Doit matcher: prenom@domaine.fr")],
        [cmt("// Ne doit PAS matcher: @domaine, prenom@, etc.")],
        [tx("")],
        [kw("const"), tx(" emailRegex = /"), hl("______"), tx("/;")],
    ],
    placeholder: "Ta regex...",
    validate: (answer: string) => {
        const r = answer.replace(/\s/g, "").toLowerCase();
        const valid = [
            "^[a-z]+@[a-z]+\\.[a-z]+$",
            "^[a-z]+@[a-z]+.[a-z]+$",
            "[a-z]+@[a-z]+\\.[a-z]+",
            "[a-z]+@[a-z]+.[a-z]+",
        ];
        return valid.some((v) => r === v || r === v.replace(/\\/g, "\\\\"));
    },
    hint1: "Indice : [a-z]+ pour les lettres, @ au milieu, n'oublie pas d'échapper le point avec \\",
    hint2: "Indice 2 : [a-z]+ = une ou plusieurs lettres minuscules. Le point doit être échappé avec \\ car c'est un caractère spécial.",
    hint3: "Réponse : ^[a-z]+@[a-z]+\\.[a-z]+$",
};