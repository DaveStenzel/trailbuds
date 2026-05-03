import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import ActivityCard from '../components/ActivityCard'

const STATES = ['All States', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
const TYPES  = ['All Types', 'hiking', 'mtb', 'trail_running', 'adventure_racing']

export default function Home({ session }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [stateFilter, setStateFilter] = useState('All States')
  const [typeFilter, setTypeFilter] = useState('All Types')

  useEffect(() => {
    fetchActivities()
  }, [stateFilter, typeFilter])

  const fetchActivities = async () => {
    setLoading(true)
    let query = supabase
      .from('activities')
      .select('*, profiles(full_name), rsvps(count)')
      .gte('date_time', new Date().toISOString())
      .order('date_time', { ascending: true })

    if (stateFilter !== 'All States') query = query.eq('state', stateFilter)
    if (typeFilter !== 'All Types')   query = query.eq('activity_type', typeFilter)

    const { data, error } = await query
    if (!error) setActivities(data ?? [])
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-trail-green mb-4">Upcoming Adventures</h2>

      <div className="flex gap-3 mb-6 flex-wrap">
        <select
          value={stateFilter}
          onChange={e => setStateFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-trail-green"
        >
          {STATES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-trail-green capitalize"
        >
          {TYPES.map(t => <option key={t}>{t.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading adventures...</p>
      ) : activities.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🏕️</p>
          <p>No adventures found. Be the first to post one!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map(a => (
            <ActivityCard key={a.id} activity={{ ...a, rsvp_count: a.rsvps?.[0]?.count ?? 0 }} />
          ))}
        </div>
      )}
    </div>
  )
}
