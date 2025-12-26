# The Harry Potter Mischief Managed App ⚡

A modern, fully-tested React application for browsing Harry Potter characters, featuring infinite scroll, favorites management, and dynamic theming based on Hogwarts houses.

**Where did I use AI?** I used GitHub Copilot to assist with writing the ReadMe file, tests and to quickly find specific Tailwind utility classes. I also leveraged it to identify potential errors or inconsistencies after completing a component.

Additionally, I used *Gemini* to research the Harry Potter universe, as I was not previously familiar with the lore.

**Technical Choices** The core application was built with React and Zustand for state management. I decided that Redux or Next.js would be overkill for this project, given the specific requirements and the app's scale.

**Time Investment** I dedicated more than 4 hours to this challenge. Because I am genuinely interested in this opportunity, I took the day off to ensure the project met my quality standards.

## 🎯 Features

- **Character Browsing**: View all Harry Potter characters with infinite scroll
- **Smart Filtering**: Filter by students, staff, or view all characters
- **Favorites System**: Add/remove characters to your favorites with persistent storage
- **House Theming**: Select a Hogwarts house to dynamically change the app's color scheme
- **Responsive Design**: Mobile-first design with hamburger menu navigation
- **Skeleton Loading**: Smooth loading states with skeleton screens
- **Image Fallbacks**: Automatic initials-based placeholders for characters without images
- **Type Safety**: Full TypeScript coverage with strict mode
- **Comprehensive Testing**: 95 unit tests covering stores, components, and pages

## 🛠️ Tech Stack

### Core
- **React 19.2** - UI library with latest features
- **TypeScript 5.9** - Type safety and better DX
- **Vite 7.2** - Lightning-fast build tool and dev server

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework with custom plugins
- **Custom Fonts** - Almendra and Cormorant Garamond from Google Fonts

### State Management
- **Zustand 5.0** - Lightweight state management with persistence
  - LocalStorage for favorites
  - SessionStorage for house selection

### Data Fetching
- **TanStack Query 5.90** - Powerful data synchronization
  - Infinite scroll implementation
  - Automatic caching and refetching
  - Optimistic updates

### Routing
- **React Router 7.11** - Declarative routing with navigation features

### Testing
- **Vitest 4.0** - Fast unit test framework
- **Testing Library** - User-centric testing utilities
- **95 tests** - Comprehensive test coverage

### Code Quality
- **ESLint 9** - Linting with TypeScript support
- **Husky 9.1** - Git hooks for running tests before push

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 10+ (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd prosigliere-challenge

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:5173`

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start dev server with hot reload

# Building
pnpm build        # Type check + production build
pnpm preview      # Preview production build locally

# Testing
pnpm test         # Run tests in watch mode
pnpm test --run   # Run tests once
pnpm test:ui      # Open Vitest UI

# Code Quality
pnpm lint         # Run ESLint
```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AllCharacters/  # Main character grid with infinite scroll
│   ├── Navigation/     # Responsive navigation with hamburger menu
│   ├── SingleCharacter/# Character detail view
│   ├── CharacterCard   # Memoized character card
│   ├── CharacterImage  # Image with fallback to initials
│   ├── SetFavorite     # Favorite toggle button
│   ├── ShowFavorites   # Filter toggle button
│   ├── Gender          # Gender symbol display
│   └── HousesCombo     # House selection dropdown
├── pages/              # Route components
│   ├── Characters/     # All characters page
│   ├── Students/       # Students only page
│   ├── Staff/          # Staff only page
│   └── Character/      # Single character detail page
├── stores/             # Zustand state management
│   ├── useFavoritesStore.ts        # Favorites with localStorage
│   ├── useHouseStore.ts            # House selection with sessionStorage
│   └── useFavoritesFilterStore.ts  # Show only favorites toggle
├── hooks/              # Custom React hooks
│   └── useCharacters.ts # TanStack Query hooks
├── services/           # API service layer
│   └── characters.service.ts
├── config/             # Configuration files
│   └── api.ts         # API endpoints and config
├── constants/          # App constants
│   └── houses.ts      # Hogwarts houses data
├── utils/              # Utility functions
│   └── formatDate.ts  # Date formatting helper
├── types/              # TypeScript type definitions
│   └── character.ts
└── test/               # Test configuration
    └── setup.ts       # Vitest setup with mocks
```

## 🧪 Testing

The project has comprehensive test coverage:

- **Stores (21 tests)**: All Zustand stores fully tested
- **Utils (10 tests)**: Date formatting with edge cases
- **Components (48 tests)**: All critical components covered
- **Pages (16 tests)**: All route components tested

```bash
# Run all tests
pnpm test --run

# Run with coverage
pnpm test --coverage

# Run specific test file
pnpm test SetFavorite.test.tsx
```

### Git Hooks

Husky is configured to run tests before every push:

```bash
# Tests will run automatically on:
git push
```

If tests fail, the push will be blocked.

## 🎨 Theming

The app features dynamic theming based on Hogwarts houses:

- **Gryffindor**: Gold and scarlet
- **Slytherin**: Green and silver  
- **Hufflepuff**: Yellow and black
- **Ravenclaw**: Blue and bronze

Theme colors are applied via CSS variables and update in real-time.

## 🔧 Configuration

### API Proxy

Vite is configured with a proxy to avoid CORS issues:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'https://hp-api.onrender.com',
      changeOrigin: true,
    },
  },
}
```

### Path Aliases

TypeScript path aliases are configured for cleaner imports:

```typescript
import { useCharacters } from '@/hooks/useCharacters'
import { Character } from '@/types/character'
```

### ESLint

Custom rules for test files to allow Testing Library matchers:

```javascript
{
  files: ['**/*.test.{ts,tsx}'],
  rules: {
    '@typescript-eslint/no-unsafe-call': 'off',
  },
}
```

## 📝 API

The app uses the [Harry Potter API](https://hp-api.onrender.com/):

- `GET /api/characters` - All characters (with pagination)
- `GET /api/characters/students` - Hogwarts students only
- `GET /api/characters/staff` - Hogwarts staff only
- `GET /api/character/:id` - Single character details

## 🚦 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## 📄 License

This project is part of a coding challenge.

## 🙏 Credits

- **Harry Potter API**: [hp-api.onrender.com](https://hp-api.onrender.com/)
- **Fonts**: Google Fonts (Almendra, Cormorant Garamond)
- **Icons**: Unicode emoji characters
