import type { CodeToken } from "./types";

export const kw = (text: string): CodeToken => ({ text, type: "keyword" });
export const str = (text: string): CodeToken => ({ text, type: "string" });
export const cmt = (text: string): CodeToken => ({ text, type: "comment" });
export const fn = (text: string): CodeToken => ({ text, type: "function" });
export const hl = (text: string): CodeToken => ({ text, type: "highlight" });
export const tx = (text: string): CodeToken => ({ text, type: "text" });