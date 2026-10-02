'use client';

import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react';

export type Theme = 'light' | 'dark';
type ThemeContextValue = { theme: Theme; setTheme: (theme: Theme) => void; toggleTheme: () => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

const readTheme = (): Theme => {
  if (typeof document === 'undefined') return 'light';
  const explicit = document.documentElement.dataset.theme;
  if (explicit === 'dark' || explicit === 'light') return explicit;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};
const subscribe = (listener: () => void) => {
  if (typeof window === 'undefined') return () => undefined;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => {
    let explicit = false;
    try { explicit = window.localStorage.getItem('portfolio-theme') === 'light' || window.localStorage.getItem('portfolio-theme') === 'dark'; } catch { /* storage may be denied */ }
    if (!explicit) document.documentElement.dataset.theme = media.matches ? 'dark' : 'light';
    listener();
  };
  const onStorage = (event: StorageEvent) => { if (event.key === 'portfolio-theme') listener(); };
  window.addEventListener('portfolio-theme-change', onChange);
  window.addEventListener('storage', onStorage);
  media.addEventListener('change', onChange);
  return () => { window.removeEventListener('portfolio-theme-change', onChange); window.removeEventListener('storage', onStorage); media.removeEventListener('change', onChange); };
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => 'light');
  const setTheme = (next: Theme) => { document.documentElement.dataset.theme = next; try { window.localStorage.setItem('portfolio-theme', next); } catch { /* storage may be denied */ } window.dispatchEvent(new Event('portfolio-theme-change')); };
  const value = useMemo(() => ({ theme, setTheme, toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark') }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() { const context = useContext(ThemeContext); if (!context) throw new Error('useTheme must be used within ThemeProvider'); return context; }
