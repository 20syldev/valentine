import { createContext, type ReactNode, useContext, useEffect, useReducer, useState } from "react";

import type { GameState } from "./types";

// Initial state
const initialState: GameState = {
    phase: "intro",
    attempts: {},
    completedChallenges: [],
    validatedAnswers: {},
};

// Actions
type GameAction =
    | { type: "START_GAME" }
    | { type: "GO_TO_CHALLENGE"; index: number }
    | { type: "GO_TO_FINALE" }
    | { type: "GO_TO_INTRO" }
    | { type: "INCREMENT_ATTEMPTS"; challengeId: string }
    | { type: "SAVE_CHALLENGE"; challengeId: string; answer: string }
    | { type: "CLEAR_STATE" }
    | { type: "HYDRATE_STATE"; state: GameState };

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case "START_GAME":
            return {
                phase: "challenge",
                index: 1,
                attempts: state.attempts,
                completedChallenges: state.completedChallenges,
                validatedAnswers: state.validatedAnswers,
            };

        case "GO_TO_CHALLENGE":
            return {
                phase: "challenge",
                index: action.index,
                attempts: state.attempts,
                completedChallenges: state.completedChallenges,
                validatedAnswers: state.validatedAnswers,
            };

        case "GO_TO_FINALE":
            return {
                phase: "finale",
                attempts: state.attempts,
                completedChallenges: state.completedChallenges,
                validatedAnswers: state.validatedAnswers,
            };

        case "GO_TO_INTRO":
            return {
                phase: "intro",
                attempts: state.attempts,
                completedChallenges: state.completedChallenges,
                validatedAnswers: state.validatedAnswers,
            };

        case "INCREMENT_ATTEMPTS": {
            const newAttempts = {
                ...state.attempts,
                [action.challengeId]: (state.attempts[action.challengeId] || 0) + 1,
            };
            return { ...state, attempts: newAttempts };
        }

        case "SAVE_CHALLENGE": {
            const newCompleted = state.completedChallenges.includes(action.challengeId)
                ? state.completedChallenges
                : [...state.completedChallenges, action.challengeId];

            const newValidated = {
                ...state.validatedAnswers,
                [action.challengeId]: action.answer,
            };

            return {
                ...state,
                completedChallenges: newCompleted,
                validatedAnswers: newValidated,
            };
        }

        case "CLEAR_STATE":
            return initialState;

        case "HYDRATE_STATE":
            return action.state;

        default:
            return state;
    }
}

// Context
interface GameContextType {
    state: GameState;
    isHydrated: boolean;
    startGame: () => void;
    goToChallenge: (index: number) => void;
    goToFinale: () => void;
    goToIntro: () => void;
    incrementAttempts: (challengeId: string) => void;
    saveChallenge: (challengeId: string, answer: string) => void;
    clearState: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider
export function GameProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem("state");
            if (saved) {
                const parsed = JSON.parse(saved) as GameState;
                if (parsed && typeof parsed === "object" && "phase" in parsed) {
                    dispatch({ type: "HYDRATE_STATE", state: parsed });
                }
            }
        } catch (error) {
            console.error("Failed to load saved state:", error);
        }
        setIsHydrated(true);
    }, []);

    // Save to localStorage when state changes (skip initial state before hydration)
    useEffect(() => {
        if (!isHydrated) return;
        try {
            localStorage.setItem("state", JSON.stringify(state));
        } catch (error) {
            console.error("Failed to save state:", error);
        }
    }, [state, isHydrated]);

    const value: GameContextType = {
        state,
        isHydrated,
        startGame: () => dispatch({ type: "START_GAME" }),
        goToChallenge: (index: number) => dispatch({ type: "GO_TO_CHALLENGE", index }),
        goToFinale: () => dispatch({ type: "GO_TO_FINALE" }),
        goToIntro: () => dispatch({ type: "GO_TO_INTRO" }),
        incrementAttempts: (challengeId: string) =>
            dispatch({ type: "INCREMENT_ATTEMPTS", challengeId }),
        saveChallenge: (challengeId: string, answer: string) =>
            dispatch({ type: "SAVE_CHALLENGE", challengeId, answer }),
        clearState: () => dispatch({ type: "CLEAR_STATE" }),
    };

    return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Hook
export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within GameProvider");
    }
    return context;
}