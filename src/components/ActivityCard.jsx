import { Link } from 'react-router-dom'

const DIFFICULTY_COLORS = {
  easy:   'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  hard:   'bg-red-100 text-red-800',
}

const ACTIVITY_ICONS = {
  hiking:        '🥾',
  mtb:           '🚵',
  trail_running: '🏃',
}

export default function ActivityCard({ activity }) {
  const date = new Date(activity.date_time)

  return (
    <Link to={`/activity/${activity.id}`} className="block">
      <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow p-4 border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{ACTIVITY_ICONS[activity.activity_type] ?? '🏕️'}</span>
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">{activity.title}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{activity.description}</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="bg-trail-stone px-2 py-1 rounded-full text-trail-green font-medium">
            📍 {activity.location_name}
          </span>
          <span className="bg-trail-stone px-2 py-1 rounded-full text-gray-600">
            📅 {date.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}
          </span>
          <span className={`px-2 py-1 rounded-full font-medium capitalize ${DIFFICULTY_COLORS[activity.difficulty] ?? 'bg-gray-100 text-gray-700'}`}>
            {activity.difficulty}
          </span>
          {activity.rsvp_count !== undefined && (
            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              👥 {activity.rsvp_count} going
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
