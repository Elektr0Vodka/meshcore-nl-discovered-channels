import { Link, useLocation } from 'react-router-dom'
import { useTheme, type Theme } from '../../hooks/useTheme'

const THEMES: { id: Theme; icon: string; label: string }[] = [
  { id: 'dark',  icon: '🌙', label: 'Dark'       },
  { id: 'light', icon: '☀',  label: 'Light'      },
  { id: 'win95', icon: '🖥',  label: 'Windows 95' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-links">
          <Link to="/" className={pathname === '/' ? 'active' : ''}>Channel Browser</Link>
          <Link to="/editor" className={pathname === '/editor' ? 'active' : ''}>Local Editor</Link>
          <Link to="/how-to" className={pathname === '/how-to' ? 'active' : ''}>How To</Link>
        </div>
        <div className="view-btns" title="Switch theme">
          {THEMES.map(t => (
            <button
              key={t.id}
              className={`view-btn${theme === t.id ? ' active' : ''}`}
              onClick={() => setTheme(t.id)}
              title={t.label}
              aria-label={t.label}
              aria-pressed={theme === t.id}
            >
              {t.icon}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
