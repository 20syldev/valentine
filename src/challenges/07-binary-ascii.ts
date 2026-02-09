import { cmt, str } from "./helpers";
import type { Challenge } from "./types";

export const binaryChallenge: Challenge = {
    id: "binary",
    title: "Code binaire de l'amour",
    description: "Décode ce message en ASCII (8 bits par caractère).",
    type: "text-input",
    codeLines: [
        [cmt("// Message binaire (ASCII 8 bits)")],
        [str("01001100 01001111 01010110 01000101")],
    ],
    placeholder: "Message décodé...",
    validate: (answer: string) => answer.toUpperCase().trim() === "LOVE",
    hint1: "Indice : Convertis chaque octet en décimal, puis utilise la table ASCII.",
    hint2: "Indice 2 : 01001111 = 79 = 'O', 01010110 = 86 = 'V', 01000101 = 69 = 'E'",
    hint3: "Réponse : LOVE",
};