import { cmt, hl, tx } from "./helpers";
import type { Challenge } from "./types";

export const hashChallenge: Challenge = {
    id: "hash",
    title: "Collision de hash",
    description:
        "Quel algorithme de hachage est vulnérable aux collisions et ne doit PLUS être utilisé pour la sécurité ?",
    type: "multiple-choice",
    codeLines: [
        [cmt("// Historique des vulnérabilités:")],
        [cmt("// 1991: Création de l'algorithme")],
        [cmt("// 2004: Première collision théorique")],
        [cmt("// 2008: Collision pratique")],
        [cmt("// 2012: Exploité par un malware célèbre")],
        [tx("")],
        [tx("Algorithme obsolète: "), hl("___")],
    ],
    options: [
        { key: "A", label: "MD5" },
        { key: "B", label: "SHA-256" },
        { key: "C", label: "bcrypt" },
        { key: "D", label: "Argon2" },
    ],
    validate: (answer: string) => answer === "A",
    hint1: "Indice : Cherche l'algorithme créé en 1991 avec des collisions découvertes en 2004.",
    hint2: "Indice 2 : Cet algorithme a 2 lettres et 1 chiffre. Il était utilisé partout dans les années 90-2000 mais est maintenant obsolète pour la sécurité.",
    hint3: "Réponse : A (MD5)",
};