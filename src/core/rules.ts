import fs from "fs";
import path from "path";
import { DorkRule, Severity } from "./types";

interface RawRule {
  id: string;
  pattern: string;
  description: string;
  severity: Severity;
}

export function loadDorkRules(): DorkRule[] {
  const file = path.join(__dirname, "../../rules/dork-rules.json");
  const raw = fs.readFileSync(file, "utf-8");
  const json = JSON.parse(raw) as RawRule[];
  return json.map((r) => ({
    id: r.id,
    description: r.description,
    severity: r.severity,
    pattern: new RegExp(r.pattern, "gi"),
  }));
}
