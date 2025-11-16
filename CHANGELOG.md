# Changelog

All notable changes to this project will be documented here.

## [v0.0.1] - 2025-11-16

### Added
- Introduced a flat ESLint configuration with `typescript-eslint`, React Hooks, and React Refresh rules to enforce consistent style and type-safe linting.
- Added targeted Vitest coverage for the wheel geometry to guard against rendering regressions, alongside stronger typing in existing tests.
- Documented the release process in the README and started this changelog for ongoing transparency.

### Changed
- Reworked the wheel rendering to use SVG arcs so each wedge forms a perfect circle segment and labels stay readable by dynamically flipping their orientation.
- Improved the service worker bootstrap so it is only registered in production builds, preventing stale caches during local development.
- Updated existing components to prefer `import type` syntax, satisfying the stricter lint rules introduced above.

### Fixed
- Corrected inverted prize text and concave wedge shapes that previously made the wheel appear star-shaped.
- Eliminated implicit `any` warnings inside tests to keep builds green under `npm run lint`.

[v0.0.1]: https://github.com/jayjay181818/Wheeltest/releases/tag/v0.0.1
