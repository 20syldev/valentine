import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names using clsx and tailwind-merge.
 * Combines conditional class values and deduplicates Tailwind CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}