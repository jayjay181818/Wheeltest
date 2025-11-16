# 🎯 Spin & Win

A modern, responsive spinning wheel game built with React, TypeScript, and Framer Motion. Features beautiful themes, smooth animations, and a clean user interface.

![Spin & Win Game](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue) ![Vite](https://img.shields.io/badge/Vite-6.0.3-purple)

## ✨ Features

### 🎮 Game Features
- **Interactive Spinning Wheel**: Smooth animations with physics-based spin mechanics
- **Customizable Prizes**: Add, remove, and edit prizes (2-12 prizes supported)
- **Predefined Prize Lists**: Quick start with money, fun items, or custom lists
- **Fair Prize Selection**: Mathematical accuracy ensures every spin is random

### 🎨 Themes & Design
- **Multiple Themes**: Warm, Vibrant, Cosmic, and Sunset color schemes
- **Modern UI**: Clean, glassmorphic design with backdrop blur effects
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Support**: Beautiful gradients and color combinations

### 🔧 Technical Features
- **PWA Ready**: Installable as a native app on any device
- **Accessibility**: Full ARIA support and keyboard navigation
- **Performance**: Optimized animations and smooth 60fps rendering
- **Type Safety**: Full TypeScript implementation for better development experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd wheeltest

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run test       # Run tests
```

## 🎯 How to Play

1. **Choose Your Theme**: Select from multiple color themes in the header
2. **Configure Prizes**: 
   - Use the dropdown for predefined lists, or
   - Add/remove/edit prizes manually (minimum 2 prizes required)
3. **Spin the Wheel**: Click "Spin The Wheel!" and watch the magic happen
4. **Win a Prize**: See your winning prize in the popup dialog
5. **Play Again**: Close the popup and spin again!

## 🎨 Themes

- **Warm Theme**: Cozy coral, orange, and yellow tones
- **Vibrant Theme**: Bold green, pink, and blue combinations  
- **Cosmic Theme**: Deep purples and teals for a mystical feel
- **Sunset Theme**: Warm pinks and oranges like a beautiful sunset

## 📱 PWA Installation

The game ships with a production-ready service worker, manifest, and maskable icons:

1. Run the app (`npm run dev` or `npm run preview`) and open it in your browser
2. Look for the "Install" prompt or "Add to Home Screen" option
3. Once installed, the offline cache (managed by `public/sw.js`) keeps the core shell available even without a network connection
4. Icons (`icon-192x192.png`, `icon-512x512.png`) and screenshots (`screenshot-wide.png`, `screenshot-narrow.png`) are included for store-quality installation prompts

> Tip: After publishing, be sure to bump the `CACHE_NAME` constant in `public/sw.js` whenever you want clients to pick up new assets.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Modern CSS with dynamic CSS variables powered by the theme system
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library (see `src/test/`)

## 🧪 Testing

- `npm run test -- --run` executes the Vitest suite in watchless mode (ideal for CI)
- Current coverage focuses on ThemeToggle interactions, prize-configuration flows, and SVG wheel geometry; build on these patterns when adding new UI
- Tests automatically load shared matchers via `src/test/setup.ts`

## 📦 Releases & Changelog

- The latest release notes live in [`CHANGELOG.md`](CHANGELOG.md). Update it whenever you ship user-facing changes.
- Tag releases following semantic versioning. For example, `git tag -a v0.0.1 -m "v0.0.1"` followed by `git push origin v0.0.1`.
- After pushing the tag, create a GitHub release that references the same version and copy the relevant changelog entry into the description so users can skim what changed.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Wheel.tsx       # Main spinning wheel
│   ├── ConfigurationPanel.tsx  # Prize configuration
│   ├── ThemeToggle.tsx # Theme selector
│   └── PrizePopup.tsx  # Win popup
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and themes
├── styles/             # Global styles and themes
└── App.tsx             # Main application component
```

## 🎮 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines
- Follow TypeScript best practices
- Maintain accessibility standards
- Test on multiple screen sizes
- Use semantic HTML

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy spinning and winning!** 🎉
