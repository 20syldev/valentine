"use client";

import { Heart, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Intro() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [exiting, setExiting] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // Easter eggs cyber fun
        const validPasswords = ["love", "iloveyou", "iloveu", "mylove", "valentine"];

        setTimeout(() => {
            const isValid = validPasswords.includes(password.toLowerCase());

            if (isValid) {
                localStorage.setItem("user", username);
                setSuccess(true);
                setLoading(false);
                setTimeout(() => {
                    setExiting(true);
                    sessionStorage.setItem("intro", "1");
                    setTimeout(() => {
                        router.push("/challenge/1");
                    }, 500);
                }, 1000);
            } else {
                setError("ACCÈS REFUSÉ - Identifiants invalides");
                setLoading(false);
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen flex flex-col sm:items-center sm:justify-center px-0 sm:px-6 overflow-hidden">
            <div className={`max-w-2xl w-full flex-1 sm:flex-initial flex flex-col ${exiting ? "animate-slide-out-up" : ""}`}>
                {/* Terminal Header */}
                <div className="bg-card border-y sm:border border-border rounded-none sm:rounded-t-lg p-3 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    <span className="text-sm font-mono text-muted-foreground">
                        root@valentine:~#
                    </span>
                </div>

                {/* Terminal Content */}
                <div className="bg-card border-b sm:border sm:border-t-0 border-border rounded-none sm:rounded-b-lg p-4 sm:p-8 font-mono space-y-6 flex-1 sm:flex-initial">
                    {/* Heart Icon */}
                    <div className="flex justify-center">
                        <Heart className="w-14 h-14 sm:w-20 sm:h-20 text-primary animate-pulse-heart fill-current" />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold animate-glow text-center">
                        HACK MY HEART
                    </h1>

                    {/* System Info */}
                    <div className="text-sm text-muted-foreground space-y-1">
                        <p>{">"} Système: Valentine v2026</p>
                        <p>{">"} Statut: 12 couches de sécurité détectées</p>
                        <p>
                            {">"} Mission: Contourner tous les défis pour débloquer le message final
                        </p>
                    </div>

                    {/* Separator */}
                    <div className="border-t border-border my-4"></div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm mb-2 text-muted-foreground">
                                {">"} NOM D'UTILISATEUR:
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-background border border-border rounded px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Entrez votre nom..."
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-2 text-muted-foreground">
                                {">"} MOT DE PASSE:
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-background border border-border rounded px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Entrez le mot de passe..."
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm animate-pulse">[!] {error}</div>
                        )}

                        {loading && !success && (
                            <div className="text-primary text-sm space-y-1">
                                <p className="animate-pulse">
                                    {">"} Connexion ssh {username}@valentine...
                                </p>
                                <p className="animate-pulse">
                                    {">"} Établissement de la connexion sécurisée...
                                </p>
                            </div>
                        )}

                        {success && (
                            <div className="text-success text-sm space-y-1">
                                <p>
                                    {">"} Connexion ssh {username}@valentine...
                                </p>
                                <p>{">"} Établissement de la connexion sécurisée...</p>
                                <p className="font-bold">{">"} CONNEXION RÉUSSIE ✓</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground rounded px-6 py-3 font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {loading ? "[AUTHENTIFICATION...]" : "[INITIER L'ACCÈS]"}
                        </button>
                    </form>

                    {/* Hint */}
                    <p className="text-xs text-muted-foreground text-center mt-4">
                        💡 Indice: Essayez des identifiants cyber courants... ou quelque chose de
                        romantique
                    </p>
                </div>
            </div>
        </div>
    );
}