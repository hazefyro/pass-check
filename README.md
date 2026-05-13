# pass-check

University project for a **Cryptography** course. A client-side password generator and strength checker aligned with NIST SP 800-63B and CERT guidelines.

## Features

**Generator**
- Random passwords using `crypto.getRandomValues()` (4–256 chars)
- Word-based passphrases from English / Polish word lists
- Configurable length, character sets, separators, and capitalisation

**Checker**
- Entropy estimation
- Common password detection (SecLists / keyboard walks)
- Repeated sequence and keyboard walk detection
- Date pattern detection
- Strength scoring

## Stack

React 19 · TypeScript · Vite · Tailwind CSS · Shadcn/Radix · deployed on Cloudflare Workers

## Dev

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm test
pnpm build
```
