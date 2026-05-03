import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Navbar({ session }) {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="bg-gradient-to-r from-trail-dark to-trail-green text-white px-6 py-3 flex items-center justify-between shadow-lg">
      <Link to="/" className="text-xl font-bold tracking-wide">
        🥾 Trailbuds
      </Link>
      <div className="flex gap-4 text-sm font-medium">
        <Link to="/feed" className="hover:text-trail-lime transition-colors">Feed</Link>
        <Link to="/search" className="hover:text-trail-lime transition-colors">Search</Link>
        <Link to="/create" className="hover:text-trail-lime transition-colors">+ Post</Link>
        <Link to="/profile" className="hover:text-trail-lime transition-colors">My Profile</Link>
        <button onClick={handleSignOut} className="hover:text-trail-lime transition-colors">
          Sign Out
        </button>
      </div>
    </nav>
  )
}
