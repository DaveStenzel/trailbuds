import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import ActivityDetail from './pages/ActivityDetail'
import CreateActivity from './pages/CreateActivity'
import MyProfile from './pages/MyProfile'
import UserProfile from './pages/UserProfile'
import Search from './pages/Search'
import Auth from './pages/Auth'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-trail-stone">
        <p className="text-trail-green text-xl font-semibold">Loading Trailbuds...</p>
      </div>
    )
  }

  return (
    <HashRouter>
      {session && <Navbar session={session} />}
      <Routes>
        <Route path="/auth" element={session ? <Navigate to="/feed" /> : <Auth />} />
        <Route path="/" element={<LandingPage session={session} />} />
        <Route path="/feed" element={session ? <Home session={session} /> : <Navigate to="/auth" />} />
        <Route path="/activity/:id" element={session ? <ActivityDetail session={session} /> : <Navigate to="/auth" />} />
        <Route path="/create" element={session ? <CreateActivity session={session} /> : <Navigate to="/auth" />} />
        <Route path="/edit/:id" element={session ? <CreateActivity session={session} /> : <Navigate to="/auth" />} />
        <Route path="/profile" element={session ? <MyProfile session={session} /> : <Navigate to="/auth" />} />
        <Route path="/user/:id" element={session ? <UserProfile session={session} /> : <Navigate to="/auth" />} />
        <Route path="/search" element={session ? <Search session={session} /> : <Navigate to="/auth" />} />
      </Routes>
    </HashRouter>
  )
}
