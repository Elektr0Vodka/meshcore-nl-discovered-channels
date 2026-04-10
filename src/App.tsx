import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import EditorPage from './pages/EditorPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
