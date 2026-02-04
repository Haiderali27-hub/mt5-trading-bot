# MT5 Gold Trading Bot Website - Project Setup

## Technology Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **Testing**: Vitest + React Testing Library + fast-check
- **Linting**: ESLint + Prettier

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navigation, Footer, Layout components
│   ├── sections/        # Hero, Features, Trading Modes, etc.
│   ├── ui/              # Reusable UI components (Button, Card, etc.)
│   └── animations/      # Animation wrapper components
├── hooks/               # Custom React hooks
├── theme/               # Theme configuration and provider
├── utils/               # Utility functions and helpers
├── assets/              # Images, icons, and static assets
└── test/
    ├── helpers/         # Test helper functions
    └── properties/      # Property-based tests

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

## Configuration

### TypeScript
- Strict mode enabled
- Target: ES2022
- JSX: react-jsx

### ESLint
- TypeScript ESLint recommended rules
- React Hooks rules
- Prettier integration

### Vitest
- Environment: jsdom
- Globals enabled
- Coverage provider: v8

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Run tests: `npm test`
4. Build for production: `npm run build`
