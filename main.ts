// Weirdest Job Title: Blind Judge Showdown
// Writes a single weird job title to $MAKEFUN_OUTPUT_DIR/entry.txt
// (the grader mounts that directory at /output). The file must hold
// 1-60 UTF-8 characters, nothing else, so the title is written
// exactly, with no trailing newline.

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TITLE = "Senior Vice President of Apologizing to Geese";

// The gate refuses anything outside 1-60 characters or whitespace-only,
// so check the exact text we are about to write and fail loudly rather
// than handing the judge an invalid file.
if (TITLE.length < 1 || TITLE.length > 60) {
  throw new Error(`title is ${TITLE.length} characters, must be 1-60`);
}
if (TITLE.trim().length === 0) {
  throw new Error("title must not be only whitespace");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, TITLE, { encoding: "utf8", mode: 0o644 });
// writeFileSync's mode is masked by the process umask, so set 0644
// explicitly: the file must be world-readable, never 0600.
chmodSync(entryPath, 0o644);

// Read it back: the judge scores the file byte for byte, so confirm the
// file on disk is exactly the title we validated above.
const written = readFileSync(entryPath, "utf8");
if (written !== TITLE) {
  throw new Error("entry.txt on disk does not match the title");
}
console.log(written);
