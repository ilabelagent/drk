export type Severity = "low" | "medium" | "high" | "critical";

export interface DorkRule {
  id: string;
  pattern: RegExp;
  description: string;
  severity: Severity;
}

export interface DorkHit {
  ruleId: string;
  match: string;
  severity: Severity;
}

export interface DorkResult {
  file: string;
  extractedText: string;
  hits: DorkHit[];
}

export type OutputFormat = "text" | "json";

export interface ScanOptions {
  hashMatches?: boolean;
}
