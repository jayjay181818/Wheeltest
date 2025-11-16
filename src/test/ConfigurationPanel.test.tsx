import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfigurationPanel from '../components/ConfigurationPanel';
import type { Prize, Theme } from '../types';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }: { children: ReactNode }) => (
      <div {...rest}>{children}</div>
    )
  }
}));

const mockTheme: Theme = {
  id: 'test',
  name: 'Test Theme',
  colors: ['#111111', '#222222'],
  background: '#000000',
  primaryColor: '#ff0000',
  secondaryColor: '#00ff00',
  accentColor: '#0000ff',
  textPrimary: '#ffffff',
  textSecondary: '#cccccc'
};

const basePrizes: Prize[] = [
  { id: '1', value: 'Prize 1' },
  { id: '2', value: 'Prize 2' }
];

const predefinedLists = {
  default: ['A', 'B', 'C'],
  money: ['$5', '$10', '$20'],
  fun: ['Hat', 'Shirt']
};

describe('ConfigurationPanel', () => {
  it('calls onPrizesChange when adding a prize', async () => {
    const onPrizesChange = vi.fn<(updated: Prize[]) => void>();
    render(
      <ConfigurationPanel
        prizes={basePrizes}
        onPrizesChange={onPrizesChange}
        predefinedLists={predefinedLists}
        theme={mockTheme}
      />
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: /add prize/i }));

    expect(onPrizesChange).toHaveBeenCalledTimes(1);
    expect(onPrizesChange.mock.calls[0][0]).toHaveLength(3);
  });

  it('replaces prizes when selecting a predefined list', async () => {
    const onPrizesChange = vi.fn<(updated: Prize[]) => void>();
    render(
      <ConfigurationPanel
        prizes={basePrizes}
        onPrizesChange={onPrizesChange}
        predefinedLists={predefinedLists}
        theme={mockTheme}
      />
    );

    const user = userEvent.setup();
    await user.selectOptions(
      screen.getByLabelText(/example prize lists/i),
      'money'
    );

    expect(onPrizesChange).toHaveBeenCalledTimes(1);
    const replaced = onPrizesChange.mock.calls[0]?.[0];
    if (!replaced) {
      throw new Error('Expected prizes to be updated');
    }
    expect(replaced.map((prize) => prize.value)).toEqual(predefinedLists.money);
  });
});
