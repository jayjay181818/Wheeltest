import type { Theme } from '../types';
import './ThemeToggle.css';

interface ThemeToggleProps {
  currentTheme: Theme;
  availableThemes: Theme[];
  onThemeChange: (theme: Theme) => void;
}

const ThemeToggle = ({ currentTheme, availableThemes, onThemeChange }: ThemeToggleProps) => {
  return (
    <div className="theme-toggle-container">
      <label htmlFor="themeSelect" className="theme-label">
        Theme:
      </label>
      <select
        id="themeSelect"
        value={currentTheme.id}
        onChange={(e) => {
          const selectedTheme = availableThemes.find(theme => theme.id === e.target.value);
          if (selectedTheme) {
            onThemeChange(selectedTheme);
          }
        }}
        className="theme-select"
        aria-label="Select theme"
      >
        {availableThemes.map(theme => (
          <option key={theme.id} value={theme.id}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeToggle;
