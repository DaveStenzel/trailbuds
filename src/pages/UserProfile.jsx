import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ActivityCard from '../components/ActivityCard'

export default function UserProfile() {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const [{ data: p }, { data: a }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', id).single(),
        supabase.from('activities').select('*').eq('created_by', id).gte('date_time', new Date().toISOString()).order('date_time'),
      ])
      setProfile(p)
      setActivities(a ?? [])
      setLoading(false)
    }
    fetchUser()
  }, [id])

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>
  if (!profile) return <div className="p-8 text-center text-gray-500">User not found.</div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
        <img
          src={profile.profile_photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name ?? 'User')}&background=2D6A4F&color=fff`}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-900">{profile.full_name}</h2>
          {profile.bio && <p className="text-sm text-gray-600 mt-0.5">{profile.bio}</p>}
          <div className="flex gap-2 mt-2 flex-wrap">
            {profile.location && <span className="text-xs bg-trail-stone text-trail-green px-2 py-0.5 rounded-full">📍 {profile.location}</span>}
            {profile.fitness_level && <span className="text-xs bg-trail-stone text-gray-600 px-2 py-0.5 rounded-full capitalize">💪 {profile.fitness_level}</span>}
            {(profile.activity_types ?? []).map(t => (
              <span key={t} className="text-xs bg-trail-stone text-trail-green px-2 py-0.5 rounded-full capitalize">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Upcoming Activities</h3>
        {activities.length === 0 ? (
          <p className="text-gray-400 text-sm">No upcoming activities.</p>
        ) : (
          <div className="space-y-3">
            {activities.map(a => <ActivityCard key={a.id} activity={a} />)}
          </div>
        )}
      </div>
    </div>
  )
}
