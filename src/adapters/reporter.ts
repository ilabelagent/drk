import { DorkResult, OutputFormat } from "../core/types";

export function printReport(result: DorkResult, format: OutputFormat): void {
  if (format === "json") {
    const payload = {
      file: result.file,
      summary: {
        hits: result.hits.length,
        bySeverity: countBy(result.hits, "severity"),
      },
      hits: result.hits,
      extractedText: result.extractedText,
    };

    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  console.log("=== Kingdom Dork Report ===");
  console.log("File:", result.file);
  console.log("Hits:", result.hits.length);

  if (result.hits.length) {
    console.log("Details:");
    for (const hit of result.hits) {
      console.log(`- [${hit.severity.toUpperCase()}] ${hit.match} (rule: ${hit.ruleId})`);
    }
  }

  console.log("");
  console.log("--- Extracted Text ---");
  console.log(result.extractedText);
}

function countBy<T extends Record<string, any>>(arr: T[], key: keyof T): Record<string, number> {
  return arr.reduce<Record<string, number>>((acc, item) => {
    const value = String(item[key]);
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}
