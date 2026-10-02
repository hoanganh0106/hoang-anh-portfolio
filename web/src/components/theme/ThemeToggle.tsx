'use client'
import { useTheme } from './ThemeProvider'
export default function ThemeToggle(){const {theme,toggleTheme}=useTheme();return <button type="button" className="label-mono border border-border px-2 py-1" aria-label="Toggle color theme" onClick={toggleTheme}>{theme==='dark'?'DARK':'LIGHT'}</button>}
