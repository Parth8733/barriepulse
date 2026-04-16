# BarriePulse — Contributing Guide

## How to Contribute

BarriePulse is a community project for Barrie, Ontario. We welcome contributions of all kinds.

### Ways to Help

- **Report a bug** — Open an issue describing what's broken
- **Suggest a feature** — Open an issue with your idea
- **Add a data source** — Know of a Barrie data source we're missing? Let us know
- **Write code** — Pick up an open issue and submit a PR
- **Test on your device** — Report any mobile/browser issues
- **Spread the word** — Share BarriePulse with fellow Barrie residents

### Development Setup

```bash
git clone https://github.com/your-org/barriepulse.git
cd barriepulse
npm install
cp .env.example .env.local
npm run dev
```

### Code Standards

- TypeScript strict mode
- ESLint + Prettier (run `npm run lint` before committing)
- Write tests for fetchers (Vitest)
- Use semantic HTML elements
- Follow existing component patterns

### Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes in small, focused commits
3. Run `npm run lint && npm run test` to ensure nothing is broken
4. Open a PR with a clear description of what you changed and why
5. Wait for review

### Code of Conduct

Be kind, be respectful, be constructive. We're building this for our community.
