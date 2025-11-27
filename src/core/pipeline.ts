import { DorkRule, DorkResult, DorkHit, ScanOptions } from "./types";
import { sha256 } from "./hash";

export function runDorkScan(
  file: string,
  text: string,
  rules: DorkRule[],
  options: ScanOptions = {}
): DorkResult {
  const hits: DorkHit[] = [];

  for (const rule of rules) {
    let match: RegExpExecArray | null;
    rule.pattern.lastIndex = 0;

    while ((match = rule.pattern.exec(text)) !== null) {
      const rawMatch = match[0];
      hits.push({
        ruleId: rule.id,
        severity: rule.severity,
        match: options.hashMatches ? sha256(rawMatch) : rawMatch,
      });
    }
  }

  return {
    file,
    extractedText: text,
    hits,
  };
}
