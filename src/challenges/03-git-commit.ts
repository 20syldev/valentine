import { cmt, hl, tx } from "./helpers";
import type { Challenge } from "./types";

export const gitChallenge: Challenge = {
    id: "git",
    title: "Git mon coeur",
    description: "Quelle commande sauvegarde définitivement mes sentiments dans l'historique ?",
    type: "multiple-choice",
    codeLines: [
        [cmt("$ git add feelings.txt")],
        [cmt("$ "), hl("______")],
        [tx("")],
        [cmt("// Quel est la prochaine étape ?")],
    ],
    options: [
        { key: "A", label: 'git commit -m "je t\'aime"' },
        { key: "B", label: "git push origin feelings" },
        { key: "C", label: "git stash" },
    ],
    validate: (answer: string) => answer === "A",
    hint1: "Indice : Cette commande sauvegarde tes changements localement avec un message.",
    hint2: "Indice 2 : La commande qui enregistre les modifications dans l'historique local avec un message.",
    hint3: 'Réponse : A (git commit -m "je t\'aime")',
};