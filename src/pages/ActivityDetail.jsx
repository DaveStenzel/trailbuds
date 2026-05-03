import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function ActivityDetail({ session }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState(null)
  const [comments, setComments] = useState([])
  const [rsvps, setRsvps] = useState([])
  const [commentText, setCommentText] = useState('')
  const [hasRsvp, setHasRsvp] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAll()
  }, [id])

  const fetchAll = async () => {
    const [{ data: act }, { data: coms }, { data: rv }] = await Promise.all([
      supabase.from('activities').select('*, profiles(full_name, id)').eq('id', id).single(),
      supabase.from('comments').select('*, profiles(full_name)').eq('activity_id', id).order('created_at'),
      supabase.from('rsvps').select('*, profiles(full_name)').eq('activity_id', id),
    ])
    setActivity(act)
    setComments(coms ?? [])
    setRsvps(rv ?? [])
    setHasRsvp((rv ?? []).some(r => r.user_id === session.user.id))
    setLoading(false)
  }

  const toggleRsvp = async () => {
    if (hasRsvp) {
      await supabase.from('rsvps').delete().eq('activity_id', id).eq('user_id', session.user.id)
      setHasRsvp(false)
      setRsvps(prev => prev.filter(r => r.user_id !== session.user.id))
    } else {
      const { data } = await supabase.from('rsvps').insert({ activity_id: id, user_id: session.user.id, status: 'going' }).select('*, profiles(full_name)').single()
      setHasRsvp(true)
      if (data) setRsvps(prev => [...prev, data])
    }
  }

  const addComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    const { data } = await supabase
      .from('comments')
      .insert({ activity_id: id, user_id: session.user.id, comment_text: commentText.trim() })
      .select('*, profiles(full_name)')
      .single()
    if (data) setComments(prev => [...prev, data])
    setCommentText('')
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading...</div>
  if (!activity) return <div className="p-8 text-center text-gray-500">Activity not found.</div>

  const date = new Date(activity.date_time)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-start justify-between mb-1">
          <h1 className="text-2xl font-bold text-gray-900">{activity.title}</h1>
          {activity.profiles?.id === session.user.id && (
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="ml-4 text-sm text-trail-green border border-trail-green px-3 py-1 rounded-lg hover:bg-trail-green hover:text-white transition-colors shrink-0"
            >
              Edit Post
            </button>
          )}
        </div>
        <p className="text-sm text-gray-500 mb-4">
          Posted by <Link to={`/user/${activity.profiles?.id}`} className="text-trail-green font-medium hover:underline">{activity.profiles?.full_name}</Link>
        </p>
        <p className="text-gray-700 mb-4">{activity.description}</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <div>📅 {date.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
          <div>⏰ {date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</div>
          <div>📍 {activity.location_name}</div>
          <div>📊 {activity.difficulty}</div>
          <div>👥 Max {activity.max_participants} people</div>
          <div>🏷️ {activity.activity_type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
        </div>
        <button
          onClick={toggleRsvp}
          className={`mt-5 w-full py-2.5 rounded-xl font-semibold transition-colors ${
            hasRsvp
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-trail-green text-white hover:bg-green-800'
          }`}
        >
          {hasRsvp ? "✗ Cancel RSVP" : "✓ I'm In!"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="font-semibold text-gray-800 mb-3">👥 Who's Going ({rsvps.length})</h2>
        {rsvps.length === 0 ? (
          <p className="text-sm text-gray-400">Nobody yet — be the first!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {rsvps.map(r => (
              <Link key={r.id} to={`/user/${r.user_id}`} className="bg-trail-stone text-trail-green text-sm px-3 py-1 rounded-full hover:bg-trail-lime transition-colors">
                {r.profiles?.full_name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="font-semibold text-gray-800 mb-3">💬 Comments ({comments.length})</h2>
        <div className="space-y-3 mb-4">
          {comments.map(c => (
            <div key={c.id} className="border-l-2 border-trail-lime pl-3">
              <p className="text-xs font-semibold text-trail-green">{c.profiles?.full_name}</p>
              <p className="text-sm text-gray-700">{c.comment_text}</p>
            </div>
          ))}
          {comments.length === 0 && <p className="text-sm text-gray-400">No comments yet.</p>}
        </div>
        <form onSubmit={addComment} className="flex gap-2">
          <input
            type="text"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Ask about gear, conditions, carpooling..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trail-green"
          />
          <button type="submit" className="bg-trail-green text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-800 transition-colors">
            Post
          </button>
        </form>
      </div>
    </div>
  )
}
