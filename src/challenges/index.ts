import { sqlChallenge } from "./01-sql-injection";
import { httpChallenge } from "./02-http-status";
import { gitChallenge } from "./03-git-commit";
import { xssChallenge } from "./04-xss-escape";
import { portChallenge } from "./05-port-https";
import { firewallChallenge } from "./06-firewall-acl";
import { binaryChallenge } from "./07-binary-ascii";
import { hashChallenge } from "./08-hash-collision";
import { sqlBypassChallenge } from "./09-sql-bypass";
import { vigenereChallenge } from "./10-vigenere";
import { subnetChallenge } from "./11-subnet-mask";
import { regexChallenge } from "./12-regex-email";
import type { Challenge } from "./types";

export const challenges: Challenge[] = [
    // FACILE (1-3)
    sqlChallenge,
    httpChallenge,
    gitChallenge,
    // MOYEN (4-8)
    xssChallenge,
    portChallenge,
    firewallChallenge,
    binaryChallenge,
    hashChallenge,
    // DIFFICILE (9-10)
    sqlBypassChallenge,
    vigenereChallenge,
    // EXPERT (11-12)
    subnetChallenge,
    regexChallenge,
];

export const FINAL_MESSAGE =
    "Félicitations ! Tu as percé les mystères de la cybersécurité et protégé ton cœur comme un·e vrai·e expert·e. ❤️‍🔥🔐 Que l'amour et la sécurité soient toujours au rendez-vous dans ta vie ! 🌹💻";

export type { Challenge, CodeLine, CodeToken, CodeTokenType } from "./types";