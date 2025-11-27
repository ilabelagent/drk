# Kingdom Dork Tool

A standalone, Kingdom-aligned TypeScript utility for ethical dork-pattern detection on local evidence. It can scan text files or OCR images/screenshots, flag suspicious patterns, and optionally hash matches so sensitive values never appear in reports.

## Features
- Works on **local text files** or **images/screenshots** via OCR (Tesseract.js).
- Config-driven rules (`rules/dork-rules.json`) for phishing panels, credential dumps, and other suspicious patterns.
- Outputs either human-readable text or structured JSON.
- Optional hashing of matches for safer handling of sensitive evidence.
- Designed to be extensible and maintainable for long-term use.

## Installation
```bash
npm install
```

## Usage
Build or run directly with tsx:
```bash
# Text files
npm run start -- text ./evidence.txt
npm run start -- text ./evidence.html --json
npm run start -- text ./dump.txt --json --hash

# Images (OCR)
npm run start -- image ./panel.png
npm run start -- image ./panel.png --json --hash
```

### CLI options
- `text <file>`: analyze a text-based file.
- `image <file>`: OCR the image and analyze the extracted text.
- `--json`: output a JSON report.
- `--hash`: hash matched values before reporting.

## Ethics and Scope
This tool is for authorized security auditing, incident response, and redaction. It must not be used for internet-wide dorking, credential harvesting, attacking services, or any unauthorized scraping.

## Development
```bash
npm run build
```

The compiled CLI will be emitted to `dist/cli/index.js` and exposed as the `kingdom-dork` binary when linked.
