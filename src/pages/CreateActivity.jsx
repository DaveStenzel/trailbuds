import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT']
const MAX_IMAGES = 6

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
  const fileRef = useRef()

  const [form, setForm]               = useState(EMPTY_FORM)
  const [existingImages, setExisting] = useState([])   // already-uploaded URLs (edit mode)
  const [newImages, setNewImages]     = useState([])   // { file, preview } objects
  const [error, setError]             = useState('')
  const [loading, setLoading]         = useState(isEditing)
  const [uploadProgress, setProgress] = useState('')

  useEffect(() => {
    if (!isEditing) return
    supabase.from('activities').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error || !data) { navigate('/'); return }
      if (data.created_by !== session.user.id) { navigate(`/activity/${id}`); return }
      const dt = data.date_time ? data.date_time.slice(0, 16) : ''
      setForm({ ...data, date_time: dt })
      setExisting(data.images ?? [])
      setLoading(false)
    })
  }, [id])

  // Clean up object URLs on unmount to avoid memory leaks
  useEffect(() => {
    return () => newImages.forEach(img => URL.revokeObjectURL(img.preview))
  }, [newImages])

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    const remaining = MAX_IMAGES - existingImages.length - newImages.length
    const accepted = files.slice(0, remaining)
    const items = accepted.map(file => ({ file, preview: URL.createObjectURL(file) }))
    setNewImages(prev => [...prev, ...items])
    e.target.value = ''
  }

  const removeExisting = (url) => setExisting(prev => prev.filter(u => u !== url))
  const removeNew = (preview) => {
    URL.revokeObjectURL(preview)
    setNewImages(prev => prev.filter(img => img.preview !== preview))
  }

  const uploadAll = async () => {
    const urls = []
    for (let i = 0; i < newImages.length; i++) {
      const { file } = newImages[i]
      setProgress(`Uploading image ${i + 1} of ${newImages.length}…`)
      const ext = file.name.split('.').pop()
      const path = `${session.user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('activity-images').upload(path, file)
      if (error) throw new Error(`Image upload failed: ${error.message}`)
      const { data } = supabase.storage.from('activity-images').getPublicUrl(path)
      urls.push(data.publicUrl)
    }
    setProgress('')
    return urls
  }

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const uploadedUrls = await uploadAll()
      const images = [...existingImages, ...uploadedUrls]

      if (isEditing) {
        const { error } = await supabase
          .from('activities')
          .update({ ...form, images })
          .eq('id', id)
          .eq('created_by', session.user.id)
        if (error) throw error
        navigate(`/activity/${id}`)
      } else {
        const { data, error } = await supabase
          .from('activities')
          .insert({ ...form, images, created_by: session.user.id })
          .select()
          .single()
        if (error) throw error
        navigate(`/activity/${data.id}`)
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const field = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-trail-green"
  const totalImages = existingImages.length + newImages.length
  const canAddMore = totalImages < MAX_IMAGES

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

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Photos <span className="text-gray-400 font-normal">({totalImages}/{MAX_IMAGES} — maps, trail shots, anything helpful)</span>
          </label>

          {/* Existing + new preview grid */}
          {totalImages > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {existingImages.map(url => (
                <div key={url} className="relative group aspect-square">
                  <img src={url} alt="" className="w-full h-full object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => removeExisting(url)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >✕</button>
                </div>
              ))}
              {newImages.map(img => (
                <div key={img.preview} className="relative group aspect-square">
                  <img src={img.preview} alt="" className="w-full h-full object-cover rounded-xl" />
                  <button
                    type="button"
                    onClick={() => removeNew(img.preview)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >✕</button>
                </div>
              ))}
            </div>
          )}

          {/* Add photos button */}
          {canAddMore && (
            <>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl py-5 text-sm text-gray-500 hover:border-trail-green hover:text-trail-green transition-colors flex flex-col items-center gap-1"
              >
                <span className="text-2xl">📸</span>
                <span className="font-medium">Add photos</span>
                <span className="text-xs text-gray-400">Maps, trail shots, meeting points — up to {MAX_IMAGES}</span>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </>
          )}
        </div>

        {uploadProgress && <p className="text-trail-green text-xs font-medium">{uploadProgress}</p>}
        {error && <p className="text-red-600 text-xs">{error}</p>}

        <button type="submit" disabled={loading} className="w-full bg-trail-green text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors disabled:opacity-60">
          {loading
            ? (uploadProgress || (isEditing ? 'Saving...' : 'Posting...'))
            : (isEditing ? 'Save Changes' : 'Post Adventure')}
        </button>
      </form>
    </div>
  )
}
