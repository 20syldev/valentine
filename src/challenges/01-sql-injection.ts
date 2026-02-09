import { hl, kw, tx } from "./helpers";
import type { Challenge } from "./types";

export const sqlChallenge: Challenge = {
    id: "sql",
    title: "SQL Injection d'Amour",
    description:
        "La base de données de mon coeur a été compromise... Complète la requête pour trouver ce que je ressens pour toi.",
    type: "text-input",
    codeLines: [
        [
            kw("SELECT"),
            tx(" * "),
            kw("FROM"),
            tx(" coeur "),
            kw("WHERE"),
            tx(" sentiment = '"),
            hl("______"),
            tx("';"),
        ],
    ],
    placeholder: "Quel sentiment ?",
    validate: (answer: string) => {
        const a = answer.trim().toLowerCase().replace(/'/g, "");
        return a === "amour" || a === "lamour" || a === "l'amour";
    },
    hint1: "Indice : Un sentiment fort en 5 lettres... que ressens-tu pour quelqu'un de spécial ?",
    hint2: "Indice 2 : C'est le sentiment le plus fort... A-M-O-?-?",
    hint3: "Réponse : AMOUR",
};