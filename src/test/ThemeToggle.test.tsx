import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '../components/ThemeToggle';
import type { Theme } from '../types';

const mockThemes: Theme[] = [
  {
    id: 'a',
    name: 'Theme A',
    colors: ['#111111'],
    background: '#000',
    primaryColor: '#ff0000',
    secondaryColor: '#00ff00',
    accentColor: '#0000ff',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc'
  },
  {
    id: 'b',
    name: 'Theme B',
    colors: ['#222222'],
    background: '#111',
    primaryColor: '#00ffff',
    secondaryColor: '#ff00ff',
    accentColor: '#ffff00',
    textPrimary: '#f1f1f1',
    textSecondary: '#d1d1d1'
  }
];

describe('ThemeToggle', () => {
  it('invokes onThemeChange when selecting a new theme', async () => {
    const onThemeChange = vi.fn<(theme: Theme) => void>();
    render(
      <ThemeToggle
        currentTheme={mockThemes[0]}
        availableThemes={mockThemes}
        onThemeChange={onThemeChange}
      />
    );

    const user = userEvent.setup();
    await user.selectOptions(
      screen.getByLabelText(/theme:/i),
      mockThemes[1].id
    );

    expect(onThemeChange).toHaveBeenCalledWith(mockThemes[1]);
  });
});
