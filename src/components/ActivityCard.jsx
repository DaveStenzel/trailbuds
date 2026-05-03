import { Link } from 'react-router-dom'

const DIFFICULTY_COLORS = {
  easy:   'bg-emerald-100 text-emerald-800',
  medium: 'bg-amber-100 text-amber-800',
  hard:   'bg-red-100 text-red-800',
}

const ACTIVITY_PHOTOS = {
  hiking:           'https://images.unsplash.com/photo-1757557676238-a63b018eeb92?auto=format&fit=crop&w=800&q=80',
  mtb:              'https://images.unsplash.com/photo-1658801536922-102ddcf99878?auto=format&fit=crop&w=800&q=80',
  trail_running:    'https://images.unsplash.com/photo-1698659313073-e08a7b67c84a?auto=format&fit=crop&w=800&q=80',
  adventure_racing: 'https://images.unsplash.com/photo-1623011332514-6ad4d39d7af1?auto=format&fit=crop&w=800&q=80',
}

const ACTIVITY_LABELS = {
  hiking:           'Hiking',
  mtb:              'MTB',
  trail_running:    'Trail Running',
  adventure_racing: 'Adventure Racing',
}

const ACTIVITY_ICONS = {
  hiking:           '🥾',
  mtb:              '🚵',
  trail_running:    '🏃',
  adventure_racing: '🏆',
}

export default function ActivityCard({ activity }) {
  const date = new Date(activity.date_time)
  const photo = ACTIVITY_PHOTOS[activity.activity_type] ?? ACTIVITY_PHOTOS.hiking

  return (
    <Link to={`/activity/${activity.id}`} className="block group">
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">

        {/* Photo banner */}
        <div className="relative h-36 overflow-hidden">
          <img
            src={photo}
            alt={activity.activity_type}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute bottom-2 left-3 text-white text-xs font-bold bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
            {ACTIVITY_ICONS[activity.activity_type]} {ACTIVITY_LABELS[activity.activity_type] ?? activity.activity_type}
          </span>
          {activity.rsvp_count !== undefined && activity.rsvp_count > 0 && (
            <span className="absolute bottom-2 right-3 text-white text-xs font-semibold bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
              👥 {activity.rsvp_count} going
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-base leading-snug mb-1">{activity.title}</h3>
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">{activity.description}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="bg-trail-mist text-trail-green font-semibold px-2.5 py-1 rounded-full">
              📍 {activity.location_name}
            </span>
            <span className="bg-trail-mist text-gray-600 px-2.5 py-1 rounded-full">
              📅 {date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
            <span className={`px-2.5 py-1 rounded-full font-semibold capitalize ${DIFFICULTY_COLORS[activity.difficulty] ?? 'bg-gray-100 text-gray-700'}`}>
              {activity.difficulty}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
