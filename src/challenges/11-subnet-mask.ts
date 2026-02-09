import { cmt, hl, tx } from "./helpers";
import type { Challenge } from "./types";

export const subnetChallenge: Challenge = {
    id: "subnet",
    title: "Calcul de sous-réseau",
    description: "Tu as besoin de 60 hôtes minimum. Quel masque CIDR utiliser ?",
    type: "text-input",
    codeLines: [
        [cmt("// Réseau de base: 192.168.1.0")],
        [cmt("// Hôtes nécessaires: 60 minimum")],
        [tx("")],
        [tx("Masque CIDR: /"), hl("__")],
    ],
    placeholder: "Ex: 24",
    validate: (answer: string) => {
        const a = answer.trim().replace("/", "");
        return a === "26"; // /26 = 32-26=6 bits hôtes = 2^6-2 = 62 hôtes
    },
    hint1: "Indice : 62 hôtes utilisables... combien de bits faut-il pour ça ? (2^n - 2 = 62)",
    hint2: "Indice 2 : Pour 60 hôtes minimum, il faut 6 bits hôtes (2^6-2=62). En IPv4, 32 bits total - 6 bits hôtes = ?",
    hint3: "Réponse : 26 (masque /26 donne 62 hôtes utilisables)",
};