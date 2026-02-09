import { cmt, tx } from "./helpers";
import type { Challenge } from "./types";

export const httpChallenge: Challenge = {
    id: "http",
    title: "Code HTTP de l'amour",
    description: "Quel code HTTP signifie que tout va bien entre nous ?",
    type: "multiple-choice",
    codeLines: [
        [cmt("// Requête vers mon-coeur.fr")],
        [tx("GET /feelings HTTP/1.1")],
        [tx("Host: mon-coeur.fr")],
        [tx("")],
        [tx("Response: "), cmt("???")],
    ],
    options: [
        { key: "A", label: "200 OK" },
        { key: "B", label: "404 Not Found" },
        { key: "C", label: "503 Service Unavailable" },
        { key: "D", label: "418 I'm a teapot" },
    ],
    validate: (answer: string) => answer === "A",
    hint1: "Indice : Les codes de succès HTTP commencent tous par le même chiffre...",
    hint2: "Indice 2 : 200 OK signifie que la requête a réussi. 404 = introuvable, 503 = service indisponible, 418 = je suis une théière 🫖",
    hint3: "Réponse : A (200 OK)",
};