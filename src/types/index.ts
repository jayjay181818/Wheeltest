export interface Prize {
  id: string;
  value: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: string[];
  background: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textPrimary: string;
  textSecondary: string;
}

export interface SpinResult {
  prize: Prize;
  angle: number;
}

export interface WheelProps {
  prizes: Prize[];
  onSpinComplete: (result: SpinResult) => void;
  isSpinning: boolean;
  theme: Theme;
}

export interface ConfigurationPanelProps {
  prizes: Prize[];
  onPrizesChange: (prizes: Prize[]) => void;
  predefinedLists: Record<string, string[]>;
  theme: Theme;
}

export interface ThemeToggleProps {
  currentTheme: Theme;
  availableThemes: Theme[];
  onThemeChange: (theme: Theme) => void;
}

export type PrizeListType = 'default' | 'money' | 'fun';
