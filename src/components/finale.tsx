"use client";

import { Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { challenges, FINAL_MESSAGE } from "@/challenges";
import { useGame } from "@/context/game";

export function Finale() {
    const { state, isHydrated, clearState } = useGame();
    const router = useRouter();
    const messageRef = useRef<HTMLParagraphElement>(null);
    const [showSubContent, setShowSubContent] = useState(false);
    const [username, setUsername] = useState("");
    const [hearts, setHearts] = useState<
        { id: number; left: number; size: number; duration: number }[]
    >([]);

    // Redirect if not all challenges completed
    useEffect(() => {
        if (!isHydrated) return;
        if (state.completedChallenges.length < challenges.length) {
            router.replace(`/challenge/${state.completedChallenges.length + 1}`);
        }
    }, [isHydrated, state.completedChallenges.length, router]);

    // Get username from localStorage
    useEffect(() => {
        const storedUsername = localStorage.getItem("user");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    // Typewriter effect
    useEffect(() => {
        const message = `> ${FINAL_MESSAGE}`;
        let i = 0;
        const element = messageRef.current;
        if (!element) return;

        element.textContent = "";
        const interval = setInterval(() => {
            if (i < message.length) {
                element.textContent += message[i];
                i++;
            } else {
                clearInterval(interval);
                setShowSubContent(true);
                startHeartRain();
            }
        }, 60);

        return () => clearInterval(interval);
    }, []);

    // Heart rain
    const startHeartRain = () => {
        let count = 0;
        const max = 30;

        const interval = setInterval(() => {
            if (count >= max) {
                clearInterval(interval);
                return;
            }

            const newHeart = {
                id: Date.now() + count,
                left: Math.random() * 100,
                size: 1 + Math.random() * 1.5,
                duration: 3 + Math.random() * 4,
            };

            setHearts((prev) => [...prev, newHeart]);
            count++;

            setTimeout(() => {
                setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
            }, newHeart.duration * 1000);
        }, 200);
    };

    const handleRestart = () => {
        clearState();
        router.push("/");
    };

    // Don't render until hydrated and all challenges completed
    if (!isHydrated || state.completedChallenges.length < challenges.length) {
        return null;
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-6">
            {/* Heart Rain */}
            {hearts.map((heart) => (
                <Heart
                    key={heart.id}
                    className="fixed top-0 text-primary fill-current pointer-events-none"
                    style={{
                        left: `${heart.left}vw`,
                        width: `${heart.size}rem`,
                        height: `${heart.size}rem`,
                        animation: `fall ${heart.duration}s linear`,
                    }}
                />
            ))}

            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Hearts Icon */}
                <div className="flex justify-center gap-2">
                    <Heart className="w-12 h-12 text-primary fill-current" />
                    <Heart className="w-12 h-12 text-primary fill-current" />
                    <Heart className="w-12 h-12 text-primary fill-current" />
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-success">ACCESS GRANTED</h1>

                {/* Separator */}
                <div className="flex justify-center">
                    <div className="text-muted-foreground text-2xl">{"─".repeat(14)}</div>
                </div>

                {/* Message with Typewriter */}
                <p ref={messageRef} className="text-lg min-h-[4rem]" />

                {/* Sub message */}
                <div
                    className={`flex items-center justify-center gap-2 transition-opacity duration-500 ${
                        showSubContent ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <span>Joyeuse Saint-Valentin{username ? ` ${username}` : ""} !</span>
                    <Sparkles className="w-5 h-5 text-primary" />
                </div>

                {/* Big Heart */}
                <div className="flex justify-center pt-4">
                    <Heart className="w-32 h-32 text-primary fill-current animate-pulse-heart" />
                </div>

                {/* Restart Button */}
                <button
                    onClick={handleRestart}
                    className={`mt-8 px-8 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-all duration-500 ${
                        showSubContent ? "opacity-100" : "opacity-0"
                    }`}
                >
                    Recommencer
                </button>
            </div>
        </div>
    );
}