import { useState } from 'react'
import { supabase } from '../lib/supabase'
import ActivityCard from '../components/ActivityCard'

const STATES      = ['Any State', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
const TYPES       = ['Any Type', 'hiking', 'mtb', 'trail_running', 'adventure_racing']
const DIFFICULTIES = ['Any Difficulty', 'easy', 'medium', 'hard']

export default function Search() {
  const [filters, setFilters] = useState({ state: 'Any State', type: 'Any Type', difficulty: 'Any Difficulty', date_from: '' })
  const [results, setResults] = useState([])
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setFilters(prev => ({ ...prev, [field]: e.target.value }))

  const runSearch = async () => {
    setLoading(true)
    setSearched(true)
    let query = supabase.from('activities').select('*').order('date_time')

    if (filters.state !== 'Any State')           query = query.eq('state', filters.state)
    if (filters.type !== 'Any Type')             query = query.eq('activity_type', filters.type)
    if (filters.difficulty !== 'Any Difficulty') query = query.eq('difficulty', filters.difficulty)
    if (filters.date_from)                       query = query.gte('date_time', filters.date_from)

    const { data } = await query
    setResults(data ?? [])
    setLoading(false)
  }

  const sel = "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trail-green"

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-trail-green mb-4">Search Adventures</h2>

      <div className="bg-white rounded-2xl shadow p-4 mb-6 grid grid-cols-2 gap-3">
        <select value={filters.state} onChange={set('state')} className={sel}>
          {STATES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={filters.type} onChange={set('type')} className={`${sel} capitalize`}>
          {TYPES.map(t => <option key={t}>{t.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
        </select>
        <select value={filters.difficulty} onChange={set('difficulty')} className={`${sel} capitalize`}>
          {DIFFICULTIES.map(d => <option key={d} className="capitalize">{d}</option>)}
        </select>
        <input type="date" value={filters.date_from} onChange={set('date_from')} className={sel} />
        <button
          onClick={runSearch}
          className="col-span-2 bg-trail-green text-white py-2.5 rounded-xl font-semibold hover:bg-green-800 transition-colors"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500">Searching...</p>}

      {!loading && searched && results.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p>No activities match your filters.</p>
        </div>
      )}

      <div className="space-y-4">
        {results.map(a => <ActivityCard key={a.id} activity={a} />)}
      </div>
    </div>
  )
}
