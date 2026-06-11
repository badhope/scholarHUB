import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { Toast } from '@/components/Toast'
import { useDocumentSettings } from '@/hooks/useDocumentSettings'
import { HomePage } from '@/pages/HomePage'
import { ResourcesPage } from '@/pages/ResourcesPage'
import { ResourceDetailPage } from '@/pages/ResourceDetailPage'
import { DisciplinePage } from '@/pages/DisciplinePage'
import { SearchPage } from '@/pages/SearchPage'
import { FavoritesPage } from '@/pages/FavoritesPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { AboutPage } from '@/pages/AboutPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  useDocumentSettings()
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--paper)' }}>
        <SiteHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resource/:id" element={<ResourceDetailPage />} />
            <Route path="/discipline/:slug" element={<DisciplinePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <SiteFooter />
        <Toast />
      </div>
    </HashRouter>
  )
}
