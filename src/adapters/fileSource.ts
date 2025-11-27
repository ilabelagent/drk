import fs from "fs";

export function textFromFile(path: string): string {
  return fs.readFileSync(path, "utf-8");
}
