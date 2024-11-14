import fs from 'fs';
import path from 'path';

function getFilePath(fileName: string) {
  const filePath = path.resolve("data", fileName);
  return filePath;
}

export const elementsText = JSON.parse(
  fs.readFileSync(getFilePath("elements_text.json"), 'utf-8'));