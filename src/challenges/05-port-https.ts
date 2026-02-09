import { cmt, hl, tx } from "./helpers";
import type { Challenge } from "./types";

export const portChallenge: Challenge = {
    id: "port",
    title: "Ping mon coeur",
    description: "L'amour doit être chiffré. Quel port utilise TLS/SSL par défaut pour HTTPS ?",
    type: "text-input",
    codeLines: [
        [cmt("// Connexion sécurisée")],
        [tx("$ openssl s_client -connect mon-coeur.fr:"), hl("___")],
        [tx("")],
    ],
    placeholder: "Numéro de port...",
    validate: (answer: string) => answer.trim() === "443",
    hint1: "Indice : HTTP = 80. HTTPS = ?",
    hint2: "Indice 2 : HTTP = port 80, HTTPS (avec TLS/SSL) = port 4__ (3 chiffres, commence par 4)",
    hint3: "Réponse : 443",
};