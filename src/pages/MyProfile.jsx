import { useEffect, useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import ActivityCard from '../components/ActivityCard'

const ACTIVITY_OPTS = ['hiking', 'mtb', 'trail_running']
const FITNESS_OPTS  = ['beginner', 'intermediate', 'advanced']
const STATES        = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']

export default function MyProfile({ session }) {
  const [profile, setProfile] = useState(null)
  const [activities, setActivities] = useState([])
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({})
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: p } = await supabase.from('profiles').select('*').eq('id', session.user.id).single()
    const { data: a } = await supabase.from('activities').select('*').eq('created_by', session.user.id).order('date_time', { ascending: false })
    setProfile(p)
    setForm(p ?? {})
    setActivities(a ?? [])
  }

  const saveProfile = async () => {
    const { error } = await supabase.from('profiles').upsert({ id: session.user.id, ...form })
    if (!error) { setProfile(form); setEditing(false) }
  }

  const uploadPhoto = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${session.user.id}/avatar.${ext}`
    const { error: uploadErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (!uploadErr) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      await supabase.from('profiles').upsert({ id: session.user.id, profile_photo: data.publicUrl })
      setProfile(prev => ({ ...prev, profile_photo: data.publicUrl }))
    }
    setUploading(false)
  }

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))
  const toggleType = (type) => setForm(prev => {
    const current = prev.activity_types ?? []
    return { ...prev, activity_types: current.includes(type) ? current.filter(t => t !== type) : [...current, type] }
  })

  const field = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trail-green"

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <img
              src={profile?.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.full_name ?? 'User')}&background=2D6A4F&color=fff`}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover cursor-pointer"
              onClick={() => fileRef.current?.click()}
            />
            {uploading && <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-xs">Uploading...</div>}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={uploadPhoto} />
          </div>
          <div className="flex-1">
            {editing ? (
              <input type="text" value={form.full_name ?? ''} onChange={set('full_name')} className={field} placeholder="Full name" />
            ) : (
              <h2 className="text-xl font-bold text-gray-900">{profile?.full_name}</h2>
            )}
            <p className="text-sm text-gray-400">{session.user.email}</p>
          </div>
          <button
            onClick={() => editing ? saveProfile() : setEditing(true)}
            className="bg-trail-green text-white text-sm px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
          >
            {editing ? 'Save' : 'Edit Profile'}
          </button>
        </div>

        {editing ? (
          <div className="space-y-3">
            <textarea value={form.bio ?? ''} onChange={set('bio')} rows={2} placeholder="Short bio..." className={field} />
            <select value={form.location ?? ''} onChange={set('location')} className={field}>
              <option value="">Select state</option>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={form.fitness_level ?? ''} onChange={set('fitness_level')} className={field}>
              <option value="">Fitness level</option>
              {FITNESS_OPTS.map(f => <option key={f} className="capitalize">{f}</option>)}
            </select>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-1">Activities</p>
              <div className="flex gap-2">
                {ACTIVITY_OPTS.map(t => (
                  <button key={t} type="button" onClick={() => toggleType(t)}
                    className={`px-3 py-1 rounded-full text-xs capitalize font-medium transition-colors ${(form.activity_types ?? []).includes(t) ? 'bg-trail-green text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-600 space-y-1">
            {profile?.bio && <p>{profile.bio}</p>}
            {profile?.location && <p>📍 {profile.location}</p>}
            {profile?.fitness_level && <p>💪 {profile.fitness_level}</p>}
            {profile?.activity_types?.length > 0 && (
              <div className="flex gap-2 mt-1 flex-wrap">
                {profile.activity_types.map(t => (
                  <span key={t} className="bg-trail-stone text-trail-green px-2 py-0.5 rounded-full text-xs capitalize">{t}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">My Activities ({activities.length})</h3>
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm">You haven't posted any activities yet.</p>
        ) : (
          <div className="space-y-3">
            {activities.map(a => <ActivityCard key={a.id} activity={a} />)}
          </div>
        )}
      </div>
    </div>
  )
}
