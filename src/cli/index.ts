#!/usr/bin/env node
import path from "path";
import { loadDorkRules } from "../core/rules";
import { runDorkScan } from "../core/pipeline";
import { textFromFile } from "../adapters/fileSource";
import { textFromImage } from "../adapters/imageSource";
import { printReport } from "../adapters/reporter";
import { OutputFormat, ScanOptions } from "../core/types";

interface ParsedArgs {
  mode: "text" | "image" | null;
  inputFile: string | null;
  format: OutputFormat;
  hashMatches: boolean;
}

function parseArgs(argv: string[]): ParsedArgs {
  const [, , modeArg, inputFile, ...rest] = argv;
  const mode = modeArg === "text" || modeArg === "image" ? modeArg : null;
  let format: OutputFormat = "text";
  let hashMatches = false;

  for (const arg of rest) {
    if (arg === "--json") format = "json";
    if (arg === "--hash") hashMatches = true;
  }

  return { mode, inputFile: inputFile || null, format, hashMatches };
}

async function main() {
  const parsed = parseArgs(process.argv);

  if (!parsed.mode || !parsed.inputFile) {
    console.log("Usage:");
    console.log(" kingdom-dork text <file> [--json] [--hash]");
    console.log(" kingdom-dork image <file> [--json] [--hash]");
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), parsed.inputFile);
  const rules = loadDorkRules();

  let text: string;

  if (parsed.mode === "text") {
    text = textFromFile(filePath);
  } else {
    text = await textFromImage(filePath);
  }

  const options: ScanOptions = { hashMatches: parsed.hashMatches };
  const result = runDorkScan(filePath, text, rules, options);

  printReport(result, parsed.format);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
