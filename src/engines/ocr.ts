import { createWorker } from "tesseract.js";

export async function ocrBufferToText(buffer: Buffer): Promise<string> {
  const worker = await createWorker();

  try {
    const {
      data: { text },
    } = await worker.recognize(buffer);
    return text;
  } finally {
    await worker.terminate();
  }
}
