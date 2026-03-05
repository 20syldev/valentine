"use client";

import { ArrowLeft, ArrowRight, Check, Heart } from "lucide-react";
import {
    Binary,
    Code,
    Database,
    GitBranch,
    Globe,
    Hash,
    Key,
    Network,
    Shield,
    Syringe,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { challenges } from "@/challenges";
import type { Challenge as ChallengeType, CodeLine, CodeToken } from "@/challenges/types";
import { useGame } from "@/context/game";
import { cn } from "@/lib/utils";

import { Progress } from "./progress";

// Icon mapping for challenges

const CHALLENGE_ICONS: Record<string, typeof Syringe> = {
    sql: Syringe,
    http: Globe,
    git: GitBranch,
    port: Network,
    binary: Binary,
    xss: Shield,
    firewall: Shield,
    regex: Code,
    subnet: Network,
    vigenere: Key,
    injection: Syringe,
    hash: Hash,
};

function CodeBlock({ lines }: { lines: CodeLine[] }) {
    const tokenClasses: Record<string, string> = {
        keyword: "text-pink-400",
        string: "text-green-400",
        comment: "text-muted-foreground italic",
        function: "text-blue-400",
        highlight: "bg-primary/20 text-primary",
        text: "",
    };

    return (
        <div className="bg-card border border-border rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm overflow-x-auto">
            {lines.map((line, lineIndex) => (
                <div key={lineIndex}>
                    {line.map((token: CodeToken, tokenIndex: number) => (
                        <span key={tokenIndex} className={tokenClasses[token.type] || ""}>
                            {token.text}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}

export function Challenge() {
    const params = useParams<{ id: string }>();
    const router = useRouter();
    const { state, isHydrated, incrementAttempts, saveChallenge } = useGame();

    const challengeIndex = parseInt(params.id || "0", 10);
    const challenge: ChallengeType = challenges[challengeIndex - 1];

    const [inputValue, setInputValue] = useState("");
    const [selectedChoice, setSelectedChoice] = useState("");
    const [packetStates, setPacketStates] = useState<boolean[]>([]);
    const [hintVisible, setHintVisible] = useState(false);
    const [currentHint, setCurrentHint] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [slideDirection, setSlideDirection] = useState<"left" | "right" | "up" | null>(null);

    const isCompleted = state.completedChallenges.includes(challenge.id);
    const validatedAnswer = state.validatedAnswers[challenge.id];
    const attempts = state.attempts[challenge.id] || 0;

    // Swipe handling
    const touchStartRef = useRef<{ x: number; time: number } | null>(null);
    const touchEndXRef = useRef<number>(0);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartRef.current = { x: e.touches[0].clientX, time: Date.now() };
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        touchEndXRef.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!touchStartRef.current) return;
        const deltaX = touchEndXRef.current - touchStartRef.current.x;
        const duration = Date.now() - touchStartRef.current.time;
        touchStartRef.current = null;

        if (Math.abs(deltaX) < 50 || duration > 300) return;

        if (deltaX < 0) {
            // Swipe left → next challenge
            const canGoNext =
                challengeIndex < challenges.length &&
                (isCompleted || state.completedChallenges.length >= challengeIndex);
            if (canGoNext) {
                router.push(`/challenge/${challengeIndex + 1}`);
            } else if (
                challengeIndex === challenges.length &&
                (isCompleted || state.completedChallenges.length >= challengeIndex)
            ) {
                router.push("/finale");
            }
        } else {
            // Swipe right → previous challenge
            if (challengeIndex > 1) {
                router.push(`/challenge/${challengeIndex - 1}`);
            }
        }
    }, [challengeIndex, isCompleted, state.completedChallenges.length, router]);

    // Block access if trying to access a challenge that hasn't been unlocked yet
    const canAccess = challengeIndex <= state.completedChallenges.length + 1;

    useEffect(() => {
        if (!isHydrated) return;

        // Redirect to intro if on first challenge and no username
        if (challengeIndex === 1) {
            const storedUsername = localStorage.getItem("user");
            if (!storedUsername) {
                router.replace("/");
                return;
            }
        }

        // Redirect if trying to access locked challenge
        if (!canAccess) {
            router.replace(`/challenge/${state.completedChallenges.length + 1}`);
        }
    }, [isHydrated, canAccess, challengeIndex, state.completedChallenges.length, router]);

    // Detect slide direction from previous challenge index or intro
    useEffect(() => {
        const fromIntro = sessionStorage.getItem("intro");
        if (fromIntro) {
            setSlideDirection("up");
            sessionStorage.removeItem("intro");
        } else {
            const prevIndex = sessionStorage.getItem("prev");
            if (prevIndex) {
                const prev = parseInt(prevIndex, 10);
                if (prev < challengeIndex) {
                    setSlideDirection("right");
                } else if (prev > challengeIndex) {
                    setSlideDirection("left");
                }
            }
        }
        sessionStorage.setItem("prev", challengeIndex.toString());
    }, [challengeIndex]);

    // Initialize packet states for firewall challenge
    useEffect(() => {
        if (challenge.type === "firewall" && challenge.packets) {
            if (isCompleted && validatedAnswer) {
                setPacketStates(validatedAnswer.split("").map((c) => c === "A"));
            } else {
                setPacketStates(new Array(challenge.packets.length).fill(false));
            }
        }
    }, [challenge.id, challenge.type, challenge.packets, isCompleted, validatedAnswer]);

    // Set validated answer if completed
    useEffect(() => {
        if (isCompleted && validatedAnswer) {
            if (challenge.type === "text-input") {
                setInputValue(validatedAnswer);
            } else if (challenge.type === "multiple-choice") {
                setSelectedChoice(validatedAnswer);
            }
        }
    }, [challenge.id, challenge.type, isCompleted, validatedAnswer]);

    const showHint = () => {
        incrementAttempts(challenge.id);
        const newAttempts = attempts + 1;

        let hint: string;
        if (newAttempts <= 2) {
            hint = challenge.hint1;
        } else if (newAttempts <= 5) {
            hint = challenge.hint2;
        } else {
            hint = challenge.hint3;
        }

        setCurrentHint(hint);
        setHintVisible(true);
    };

    const handleSubmit = (answer: string) => {
        if (isCompleted) return;

        if (challenge.validate(answer)) {
            setIsSuccess(true);
            setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => {
                    saveChallenge(challenge.id, answer);
                    if (challengeIndex < challenges.length - 1) {
                        router.push(`/challenge/${challengeIndex + 1}`);
                    } else {
                        router.push("/finale");
                    }
                }, 400);
            }, 1000);
        } else {
            setIsError(true);
            setTimeout(() => setIsError(false), 500);
            showHint();
        }
    };

    const handleTextSubmit = () => {
        handleSubmit(inputValue);
    };

    const handleChoiceSubmit = (key: string) => {
        setSelectedChoice(key);
        handleSubmit(key);
    };

    const handleFirewallSubmit = () => {
        const answer = packetStates.map((state) => (state ? "A" : "B")).join("");
        handleSubmit(answer);
    };

    const Icon = CHALLENGE_ICONS[challenge.id] || Database;

    // Don't render if not hydrated, can't access, or on challenge 0 without username
    if (!isHydrated || !canAccess) {
        return null;
    }

    if (challengeIndex === 0 && typeof window !== "undefined") {
        const storedUsername = localStorage.getItem("user");
        if (!storedUsername) {
            return null;
        }
    }

    return (
        <>
            <Progress current={state.completedChallenges.length} total={challenges.length} />
            <div
                className="min-h-screen flex flex-col sm:items-center sm:justify-center px-0 sm:px-6 pt-6 sm:py-20 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: "pan-y" }}
            >
                {/* Navigation Buttons */}
                {challengeIndex > 1 && (
                    <Link
                        href={`/challenge/${challengeIndex - 1}`}
                        className="hidden sm:block fixed left-4 top-1/2 -translate-y-1/2 p-2 bg-card hover:bg-card/80 rounded-full transition-all duration-300 z-10 hover:translate-x-0.5"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform" />
                    </Link>
                )}

                {challengeIndex < challenges.length &&
                    (isCompleted || state.completedChallenges.length >= challengeIndex) && (
                        <Link
                            href={`/challenge/${challengeIndex + 1}`}
                            className="hidden sm:block fixed right-4 top-1/2 -translate-y-1/2 p-2 bg-card hover:bg-card/80 rounded-full transition-all duration-300 hover:translate-x-0.5"
                        >
                            <ArrowRight className="w-4 h-4 transition-transform" />
                        </Link>
                    )}

                {/* Button to finale when on last challenge and completed */}
                {challengeIndex === challenges.length &&
                    (isCompleted || state.completedChallenges.length >= challengeIndex) && (
                        <Link
                            href="/finale"
                            className="hidden sm:flex fixed right-4 top-1/2 -translate-y-1/2 gap-2 items-center px-4 py-2 bg-success hover:bg-success/90 text-white rounded-full transition-all duration-300 font-semibold text-sm hover:translate-x-0.5 shadow-lg"
                        >
                            Terminer
                            <ArrowRight className="w-4 h-4 transition-transform" />
                        </Link>
                    )}

                {/* Mobile Header */}
                <div className="flex sm:hidden items-center justify-center gap-5 pb-5">
                    <Heart className="w-6 h-6 text-primary fill-current" />
                    <span className="text-md font-bold text-primary tracking-widest">HACK MY HEART</span>
                    <Heart className="w-6 h-6 text-primary fill-current" />
                </div>

                {/* Challenge Card */}
                <div
                    className={cn(
                        "max-w-2xl w-full flex-1 sm:flex-initial bg-card border-y sm:border border-border rounded-none sm:rounded-lg p-4 sm:p-8 space-y-4 sm:space-y-6 transition-all duration-300",
                        isSuccess && "ring-2 ring-success shadow-lg shadow-success/20",
                        isExiting && "animate-slide-out-left",
                        isError && "animate-shake",
                        slideDirection === "left" && "animate-slide-in-left",
                        slideDirection === "right" && "animate-slide-in-right",
                        slideDirection === "up" && "animate-slide-in-up"
                    )}
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-primary shrink-0" />
                        <h2 className="text-xl sm:text-2xl font-bold">{challenge.title}</h2>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground">{challenge.description}</p>

                    {/* Code Block */}
                    {challenge.codeLines && challenge.codeLines.length > 0 && (
                        <CodeBlock lines={challenge.codeLines} />
                    )}

                    {/* Input Types */}
                    {challenge.type === "text-input" && (
                        <div className="flex gap-2 sm:gap-3">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && !isSuccess && handleTextSubmit()
                                }
                                placeholder={challenge.placeholder || "Ta réponse..."}
                                disabled={isCompleted || isSuccess}
                                className={cn(
                                    "flex-1 min-w-0 px-3 sm:px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring",
                                    (isCompleted || isSuccess) && "border-success"
                                )}
                                autoFocus
                            />
                            <button
                                onClick={handleTextSubmit}
                                disabled={isCompleted || isSuccess}
                                className={cn(
                                    "px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors shrink-0",
                                    isCompleted || isSuccess
                                        ? "bg-success text-white"
                                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                                )}
                            >
                                {isCompleted || isSuccess ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    "Valider"
                                )}
                            </button>
                        </div>
                    )}

                    {challenge.type === "multiple-choice" && (
                        <div className="space-y-3">
                            {challenge.options?.map((opt) => {
                                const isCorrect = isCompleted && challenge.validate(opt.key);
                                const isSelected = selectedChoice === opt.key;
                                const isSuccessSelected = isSuccess && isSelected;

                                return (
                                    <button
                                        key={opt.key}
                                        onClick={() =>
                                            !isCompleted &&
                                            !isSuccess &&
                                            handleChoiceSubmit(opt.key)
                                        }
                                        disabled={isCompleted || isSuccess}
                                        className={cn(
                                            "w-full px-4 py-3 text-left border rounded-lg transition-all duration-200",
                                            isCorrect || isSuccessSelected
                                                ? "bg-success/20 border-success text-success"
                                                : "bg-card border-border hover:bg-muted hover:border-primary/50 hover:scale-[1.01] hover:shadow-lg hover:shadow-primary/10",
                                            isSelected &&
                                                !isCompleted &&
                                                !isSuccess &&
                                                "border-primary bg-primary/20 text-primary"
                                        )}
                                    >
                                        <span className="flex items-center gap-3">
                                            {(isCorrect || isSuccessSelected) && (
                                                <Check className="w-5 h-5" />
                                            )}
                                            <span>
                                                {opt.key}. {opt.label}
                                            </span>
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {challenge.type === "firewall" && (
                        <div className="space-y-4">
                            <div className="bg-card border border-border rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-2">
                                {challenge.packets?.map((packet, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-3 py-1.5 px-2 rounded hover:bg-muted/50 transition-colors"
                                    >
                                        <span className="text-muted-foreground text-xs w-5 shrink-0">
                                            #{index + 1}
                                        </span>
                                        <span className="text-pink-400 truncate">{packet.src}</span>
                                        <span className="text-muted-foreground">→</span>
                                        <span className="text-blue-400 truncate">{packet.dst}</span>
                                        <span className="text-muted-foreground mx-1 hidden sm:inline">|</span>
                                        <span className="text-green-400 flex-1 truncate">
                                            {packet.payload}
                                        </span>
                                        <button
                                            onClick={() => {
                                                if (!isCompleted && !isSuccess) {
                                                    const newStates = [...packetStates];
                                                    newStates[index] = !newStates[index];
                                                    setPacketStates(newStates);
                                                }
                                            }}
                                            disabled={isCompleted || isSuccess}
                                            className={cn(
                                                "px-3 py-1 rounded text-xs font-semibold transition-colors shrink-0",
                                                isCompleted || isSuccess
                                                    ? "cursor-default"
                                                    : "cursor-pointer",
                                                packetStates[index]
                                                    ? "bg-success/20 text-success border border-success/30 hover:bg-success/30"
                                                    : "bg-destructive/20 text-destructive border border-destructive/30 hover:bg-destructive/30"
                                            )}
                                        >
                                            {packetStates[index] ? "ALLOW" : "BLOCK"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={handleFirewallSubmit}
                                disabled={isCompleted || isSuccess}
                                className={cn(
                                    "w-full px-6 py-2 rounded-lg font-semibold transition-colors",
                                    isCompleted || isSuccess
                                        ? "bg-success text-white"
                                        : "bg-primary text-primary-foreground hover:bg-primary/90"
                                )}
                            >
                                {isCompleted || isSuccess ? (
                                    <Check className="w-5 h-5 mx-auto" />
                                ) : (
                                    "Valider"
                                )}
                            </button>
                        </div>
                    )}

                    {/* Hint */}
                    {hintVisible && (
                        <div className="p-4 bg-muted border border-border rounded-lg text-sm text-muted-foreground">
                            💡 {currentHint}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}