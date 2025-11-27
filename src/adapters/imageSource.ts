import fs from "fs";
import { ocrBufferToText } from "../engines/ocr";

export async function textFromImage(path: string): Promise<string> {
  const buffer = fs.readFileSync(path);
  return ocrBufferToText(buffer);
}
