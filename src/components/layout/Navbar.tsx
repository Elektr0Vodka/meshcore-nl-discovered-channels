import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

export default function Navbar() {
  const { pathname } = useLocation()
  const { theme, toggle } = useTheme()

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-links">
          <Link to="/" className={pathname === '/' ? 'active' : ''}>Channel Browser</Link>
          <Link to="/editor" className={pathname === '/editor' ? 'active' : ''}>Local Editor</Link>
          <Link to="/how-to" className={pathname === '/how-to' ? 'active' : ''}>How To</Link>
        </div>
        <button
          className="theme-toggle"
          onClick={toggle}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀' : '🌙'}
        </button>
      </div>
    </nav>
  )
}
