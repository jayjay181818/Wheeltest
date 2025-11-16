import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import Wheel from '../components/Wheel';
import type { Prize, Theme } from '../types';

vi.mock('framer-motion', () => {
  const stripMotionProps = (props: Record<string, unknown>) => {
    const domProps = { ...props };
    delete domProps.whileHover;
    delete domProps.whileTap;
    delete domProps.animate;
    delete domProps.initial;
    delete domProps.transition;
    return domProps;
  };

  const componentFor = (tag: string) => {
    const element = ['button', 'svg'].includes(tag) ? tag : 'div';
    return ({ children, ...rest }: { children?: ReactNode } & Record<string, unknown>) =>
      createElement(element, stripMotionProps(rest), children);
  };

  const motionProxy = new Proxy(
    {},
    {
      get: (_target, prop: string | symbol) =>
        typeof prop === 'string' ? componentFor(prop) : componentFor('div')
    }
  );

  return {
    motion: motionProxy,
    useAnimation: () => ({
      start: () => Promise.resolve()
    })
  };
});

const mockTheme: Theme = {
  id: 'test',
  name: 'Test Theme',
  colors: ['#111111', '#222222', '#333333'],
  background: '#000000',
  primaryColor: '#111111',
  secondaryColor: '#222222',
  accentColor: '#333333',
  textPrimary: '#ffffff',
  textSecondary: '#cccccc'
};

const basePrizes: Prize[] = Array.from({ length: 6 }, (_, index) => ({
  id: String(index + 1),
  value: `Prize ${index + 1}`
}));

const renderWheel = (prizes: Prize[]) =>
  render(
    <Wheel
      prizes={prizes}
      isSpinning={false}
      onSpinComplete={() => {}}
      onSpinStart={() => {}}
      theme={mockTheme}
    />
  );

describe('Wheel geometry', () => {
  it('renders an SVG segment for each prize', () => {
    const { container } = renderWheel(basePrizes);
    const segments = container.querySelectorAll('path.wheel-segment-path');
    expect(segments).toHaveLength(basePrizes.length);
    segments.forEach((seg) => {
      expect(seg.getAttribute('d')).toContain('A 200 200');
    });
  });

  it('positions each label with explicit coordinates', () => {
    const { container } = renderWheel(basePrizes);
    const labels = container.querySelectorAll('text.segment-text');
    expect(labels).toHaveLength(basePrizes.length);
    labels.forEach((label) => {
      expect(label.getAttribute('x')).not.toBeNull();
      expect(label.getAttribute('y')).not.toBeNull();
    });
  });

  it('creates a complete arc when only one prize is present', () => {
    const singlePrize: Prize[] = [{ id: 'only', value: 'Only Prize' }];
    const { container } = renderWheel(singlePrize);
    const segment = container.querySelector('path.wheel-segment-path');
    expect(segment).not.toBeNull();
    expect(segment?.getAttribute('d')).toContain('A 200 200 0 1 1');
  });
});
