import { cmt, str } from "./helpers";
import type { Challenge } from "./types";

export const vigenereChallenge: Challenge = {
    id: "vigenere",
    title: "Chiffre de Vigenère",
    description: "Déchiffre ce message avec la clé 'COEUR'.",
    type: "text-input",
    codeLines: [[cmt("// Texte chiffré:")], [str("LS XUZOS")], [cmt("")], [cmt("// Clé: COEUR")]],
    placeholder: "Message déchiffré...",
    validate: (answer: string) => {
        const a = answer.toUpperCase().replace(/[^A-Z]/g, "");
        return a === "JETAIME";
    },
    hint1: "Indice : Soustrais chaque lettre de la clé. Exemple: L-C = J (11-2=9)",
    hint2: "Indice 2 : Le message fait 7 lettres et exprime un sentiment très fort en français... JE T'____",
    hint3: "Réponse : JETAIME (ou JE TAIME)",
};