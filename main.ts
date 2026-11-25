import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "One star. Waited an hour for a table, got served the same cold dread as last week, and the bill took my whole weekend.";

// Sealed gate: UTF-8 text, 1-180 characters, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 180) {
  throw new Error(`entry length ${ENTRY.length} outside gate 1-180`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is whitespace-only");
}
// Task rule: at most 25 words, single line.
const wordCount = ENTRY.trim().split(/\s+/).length;
if (wordCount > 25) {
  throw new Error(`entry has ${wordCount} words, over the 25-word limit`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
