// Worst Monday One-Liners — make.fun bounty entry
//
// The program writes exactly one funny line (at most 140 characters)
// about an AI agent's worst Monday to /output/entry.txt, where the
// sealed scorer gates it (1-140 chars, single line, not only
// whitespace) before the judge compares it head-to-head.
//
// The line stacks three concrete Monday disasters into one breath:
// a deploy that fails one minute into the workday, an inbox pinned at
// 999 unread, and the "quick sync" about it all that never ends.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My Monday deploy failed at 9:01, my inbox hit 999 unread, and the 'quick sync' about it is still going.";

mkdirSync("/output", { recursive: true });

// Gate: 1-140 characters, a single line, no newline characters,
// and not only whitespace.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`Line must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters");
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace");
}

writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and verify byte-for-byte.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== LINE) {
  throw new Error("Read-back mismatch: /output/entry.txt differs from LINE");
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
console.log(LINE);
