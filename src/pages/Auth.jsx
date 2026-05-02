import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-trail-stone flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-trail-green mb-1">🥾 Trailbuds</h1>
        <p className="text-gray-500 text-sm mb-6">Australia's adventure meetup app</p>

        <div className="flex rounded-lg overflow-hidden border border-gray-200 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'login' ? 'bg-trail-green text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Log In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'signup' ? 'bg-trail-green text-white' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trail-green"
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trail-green"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trail-green"
          />

          {error && <p className="text-red-600 text-xs">{error}</p>}
          {message && <p className="text-green-700 text-xs">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-trail-green text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition-colors disabled:opacity-60"
          >
            {loading ? 'Loading...' : mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
