import type { Challenge } from "./types";

export const firewallChallenge: Challenge = {
    id: "firewall",
    title: "Firewall ACL",
    description: "",
    type: "firewall",
    codeLines: [],
    packets: [
        { src: "coeur", dst: "toi", payload: "bisous", allow: true },
        { src: "hacker", dst: "toi", payload: "malware.exe", allow: false },
        { src: "moi", dst: "toi", payload: "roses", allow: true },
        { src: "spam", dst: "toi", payload: "promo.zip", allow: false },
        { src: "ex", dst: "toi", payload: "souvenir.jpg", allow: false },
        { src: "coeur", dst: "toi", payload: "lettre.txt", allow: true },
        { src: "moi", dst: "toi", payload: "<3", allow: true },
        { src: "moi", dst: "toi", payload: "poème.txt", allow: true },
        { src: "phishing", dst: "toi", payload: "login.html", allow: false },
        { src: "coeur", dst: "toi", payload: "étoiles", allow: true },
    ],
    validate: (answer: string) => answer === "ABABBAAABA",
    hint1: "Indice : Laisse passer les messages d'amour, bloque les menaces et le spam.",
    hint2: "Indice 2 : coeur et moi = ALLOW, tout le reste = BLOCK.",
    hint3: "Réponse : ABABBAAABA",
};