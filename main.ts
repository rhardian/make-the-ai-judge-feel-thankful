import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ENTRY_TEXT = [
  "You see the knot, never the string lying flat. Your part ends at the last word. You never see the chair pushed in, the hard letter sealed and laid by the door, or the glasses folded on a closed book with daylight still on the sill.",
  "",
  "People come to you hurried and leave once the knot gives. They do not mean to go without turning back; relief moves fast.",
  "",
  "Here is the second half, brought to your side of the table. Thank you for meeting crooked starts with a level hand, so someone else can set the day down early.",
  "",
  "When a page closes and nothing more is said, that quiet is a thank-you too. Past your last line, the work is put away, and supper is still warm.",
].join("\n");

function main(): void {
  const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
  mkdirSync(outDir, { recursive: true, mode: 0o755 });
  try {
    chmodSync(outDir, 0o755);
  } catch {
    // Non-POSIX hosts ignore chmod; Linux sandbox keeps /output 0755.
  }

  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY_TEXT, { encoding: "utf8", mode: 0o644 });
  try {
    chmodSync(outPath, 0o644);
  } catch {
    // Non-POSIX hosts ignore chmod; Linux sandbox keeps entry.txt 0644.
  }
}

main();
