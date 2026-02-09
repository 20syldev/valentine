export type GameState =
    | {
          phase: "intro";
          attempts: Record<string, number>;
          completedChallenges: string[];
          validatedAnswers: Record<string, string>;
      }
    | {
          phase: "challenge";
          index: number;
          attempts: Record<string, number>;
          completedChallenges: string[];
          validatedAnswers: Record<string, string>;
      }
    | {
          phase: "finale";
          attempts: Record<string, number>;
          completedChallenges: string[];
          validatedAnswers: Record<string, string>;
      };