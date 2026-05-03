import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']

const EMPTY_FORM = {
  title: '',
  description: '',
  date_time: '',
  location_name: '',
  state: 'NSW',
  activity_type: 'hiking',
  difficulty: 'easy',
  max_participants: 10,
}

export default function CreateActivity({ session }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    if (!isEditing) return
    supabase.from('activities').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error || !data) { navigate('/'); return }
      if (data.created_by !== session.user.id) { navigate(`/activity/${id}`); return }
      // Format datetime-local value (strip seconds/timezone)
      const dt = data.date_time ? data.date_time.slice(0, 16) : ''
      setForm({ ...data, date_time: dt })
      setLoading(false)
    })
  }, [id])

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (isEditing) {
      const { error } = await supabase
        .from('activities')
        .update({ ...form })
        .eq('id', id)
        .eq('created_by', session.user.id)

      if (error) { setError(error.message); setLoading(false) }
      else navigate(`/activity/${id}`)
    } else {
      const { data, error } = await supabase
        .from('activities')
        .insert({ ...form, created_by: session.user.id })
        .select()
        .single()

      if (error) { setError(error.message); setLoading(false) }
      else navigate(`/activity/${data.id}`)
    }
  }

  const field = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trail-green"

  return (
    <div className="max-w-xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-trail-green mb-6">{isEditing ? 'Edit Adventure' : 'Post an Adventure'}</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" value={form.title} onChange={set('title')} required placeholder="e.g. Blue Mountains sunrise hike" className={field} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea value={form.description} onChange={set('description')} rows={3} placeholder="Tell people about the trail, what to bring, meeting point..." className={field} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
            <input type="datetime-local" value={form.date_time} onChange={set('date_time')} required className={field} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <select value={form.state} onChange={set('state')} className={field}>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
          <input type="text" value={form.location_name} onChange={set('location_name')} required placeholder="e.g. Katoomba, NSW" className={field} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity</label>
            <select value={form.activity_type} onChange={set('activity_type')} className={field}>
              <option value="hiking">Hiking</option>
              <option value="mtb">MTB</option>
              <option value="trail_running">Trail Running</option>
              <option value="adventure_racing">Adventure Racing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select value={form.difficulty} onChange={set('difficulty')} className={field}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max People</label>
            <input type="number" value={form.max_participants} onChange={set('max_participants')} min={2} max={100} className={field} />
          </div>
        </div>

        {error && <p className="text-red-600 text-xs">{error}</p>}

        <button type="submit" disabled={loading} className="w-full bg-trail-green text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors disabled:opacity-60">
          {loading ? (isEditing ? 'Saving...' : 'Posting...') : (isEditing ? 'Save Changes' : 'Post Adventure')}
        </button>
      </form>
    </div>
  )
}
