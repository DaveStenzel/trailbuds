import { Link } from 'react-router-dom'

const PARKS = {
  NSW: [
    { name: 'Blue Mountains', url: 'https://www.nationalparks.nsw.gov.au/visit-a-park/parks/blue-mountains-national-park' },
    { name: 'Royal National Park', url: 'https://www.nationalparks.nsw.gov.au/visit-a-park/parks/royal-national-park' },
    { name: 'Kosciuszko', url: 'https://www.nationalparks.nsw.gov.au/visit-a-park/parks/kosciuszko-national-park' },
    { name: 'Ku-ring-gai Chase', url: 'https://www.nationalparks.nsw.gov.au/visit-a-park/parks/ku-ring-gai-chase-national-park' },
    { name: 'Barrington Tops', url: 'https://www.nationalparks.nsw.gov.au/visit-a-park/parks/barrington-tops-national-park' },
    { name: 'Murramarang', url: 'https://www.nationalparks.nsw.gov.au/visit-a-park/parks/murramarang-national-park' },
  ],
  VIC: [
    { name: 'Grampians (Gariwerd)', url: 'https://www.parks.vic.gov.au/places-to-see/parks/grampians-national-park' },
    { name: 'Wilsons Promontory', url: 'https://www.parks.vic.gov.au/places-to-see/parks/wilsons-promontory-national-park' },
    { name: 'Alpine National Park', url: 'https://www.parks.vic.gov.au/places-to-see/parks/alpine-national-park' },
    { name: 'Great Otway', url: 'https://www.parks.vic.gov.au/places-to-see/parks/great-otway-national-park' },
    { name: 'Yarra Ranges', url: 'https://www.parks.vic.gov.au/places-to-see/parks/yarra-ranges-national-park' },
    { name: 'Croajingolong', url: 'https://www.parks.vic.gov.au/places-to-see/parks/croajingolong-national-park' },
  ],
  QLD: [
    { name: 'Daintree', url: 'https://parks.des.qld.gov.au/parks/daintree' },
    { name: 'Lamington', url: 'https://parks.des.qld.gov.au/parks/lamington' },
    { name: 'Carnarvon Gorge', url: 'https://parks.des.qld.gov.au/parks/carnarvon-gorge' },
    { name: 'Main Range', url: 'https://parks.des.qld.gov.au/parks/main-range' },
    { name: 'Springbrook', url: 'https://parks.des.qld.gov.au/parks/springbrook' },
    { name: 'Whitsunday Islands', url: 'https://parks.des.qld.gov.au/parks/whitsunday-islands' },
  ],
  WA: [
    { name: 'Karijini', url: 'https://parks.dpaw.wa.gov.au/park/karijini' },
    { name: 'Stirling Range', url: 'https://parks.dpaw.wa.gov.au/park/stirling-range' },
    { name: 'Cape Range', url: 'https://parks.dpaw.wa.gov.au/park/cape-range' },
    { name: 'Purnululu (Bungle Bungles)', url: 'https://parks.dpaw.wa.gov.au/park/purnululu' },
    { name: 'D\'Entrecasteaux', url: 'https://parks.dpaw.wa.gov.au/park/dentrecasteaux' },
    { name: 'Fitzgerald River', url: 'https://parks.dpaw.wa.gov.au/park/fitzgerald-river' },
  ],
  SA: [
    { name: 'Flinders Ranges', url: 'https://www.parks.sa.gov.au/find-a-park/Browse_by_region/flinders-ranges-and-outback/flinders-ranges-national-park' },
    { name: 'Coorong', url: 'https://www.parks.sa.gov.au/find-a-park/Browse_by_region/south-east/coorong-national-park' },
    { name: 'Lincoln', url: 'https://www.parks.sa.gov.au/find-a-park/Browse_by_region/eyre-peninsula/lincoln-national-park' },
    { name: 'Ikara-Flinders Ranges', url: 'https://www.parks.sa.gov.au/find-a-park/Browse_by_region/flinders-ranges-and-outback/ikara-flinders-ranges-national-park' },
    { name: 'Belair', url: 'https://www.parks.sa.gov.au/find-a-park/Browse_by_region/adelaide-and-surrounds/belair-national-park' },
  ],
  TAS: [
    { name: 'Cradle Mountain–Lake St Clair', url: 'https://parks.tas.gov.au/explore-our-parks/cradle-mountain-lake-st-clair-national-park' },
    { name: 'Freycinet', url: 'https://parks.tas.gov.au/explore-our-parks/freycinet-national-park' },
    { name: 'Southwest', url: 'https://parks.tas.gov.au/explore-our-parks/southwest-national-park' },
    { name: 'Mt Field', url: 'https://parks.tas.gov.au/explore-our-parks/mount-field-national-park' },
    { name: 'Bay of Fires', url: 'https://parks.tas.gov.au/explore-our-parks/bay-of-fires-conservation-area' },
    { name: 'Mt William', url: 'https://parks.tas.gov.au/explore-our-parks/mount-william-national-park' },
  ],
  ACT: [
    { name: 'Namadgi', url: 'https://www.environment.act.gov.au/parks-conservation/parks-and-reserves/namadgi-national-park' },
    { name: 'Tidbinbilla Nature Reserve', url: 'https://www.environment.act.gov.au/parks-conservation/parks-and-reserves/tidbinbilla-nature-reserve' },
  ],
  NT: [
    { name: 'Kakadu', url: 'https://parksaustralia.gov.au/kakadu/' },
    { name: 'Uluru–Kata Tjuta', url: 'https://parksaustralia.gov.au/uluru/' },
    { name: 'Litchfield', url: 'https://nt.gov.au/leisure/parks-reserves/find-a-park-to-visit/litchfield-national-park' },
    { name: 'Nitmiluk (Katherine Gorge)', url: 'https://nt.gov.au/leisure/parks-reserves/find-a-park-to-visit/nitmiluk-national-park' },
    { name: 'West MacDonnell Ranges', url: 'https://nt.gov.au/leisure/parks-reserves/find-a-park-to-visit/west-macdonnell-national-park' },
  ],
}

const STATE_COLORS = {
  NSW: 'bg-blue-50 border-blue-200',
  VIC: 'bg-indigo-50 border-indigo-200',
  QLD: 'bg-amber-50 border-amber-200',
  WA:  'bg-orange-50 border-orange-200',
  SA:  'bg-red-50 border-red-200',
  TAS: 'bg-teal-50 border-teal-200',
  ACT: 'bg-purple-50 border-purple-200',
  NT:  'bg-yellow-50 border-yellow-200',
}

const WARNINGS = [
  { icon: '🐍', title: 'Snakes & Spiders', text: 'Australia has some of the world\'s most venomous species. Watch where you step and place your hands. Never reach under rocks or logs.' },
  { icon: '☀️', title: 'Sun & Heat', text: 'UV is extreme year-round. Wear SPF 50+, a hat, and sun-protective clothing. Start early and avoid hiking midday in summer.' },
  { icon: '💧', title: 'Carry Enough Water', text: 'Dehydration is a leading cause of rescues. Carry at least 1 litre per hour of activity. Don\'t rely on finding water on trail.' },
  { icon: '🌊', title: 'Flash Flooding', text: 'Gorges and creek beds can flood without warning even on clear days. Check upstream weather and never camp in a dry creek bed.' },
  { icon: '🔥', title: 'Bushfire', text: 'Check fire danger ratings and Total Fire Bans before heading out. Know your exit routes. Have a go-early plan on high-danger days.' },
  { icon: '📡', title: 'Tell Someone Your Plan', text: 'Always leave a trip plan with a trusted person — where you\'re going, which track, and when to call for help if you\'re not back.' },
  { icon: '🦟', title: 'Ticks & Leeches', text: 'Common in eastern coastal ranges. Check yourself after every walk. Remove ticks by freezing with ether spray — never twist or squeeze.' },
  { icon: '🩺', title: 'Marine Stingers (QLD)', text: 'Box jellyfish and Irukandji are deadly. Swim only in stinger-netted areas Oct–May. Carry vinegar for first aid.' },
]

export default function LandingPage({ session }) {
  return (
    <div className="min-h-screen bg-trail-stone">

      {/* Hero */}
      <div className="bg-trail-green text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <p className="text-trail-lime font-semibold tracking-widest text-sm uppercase mb-3">Australia's Adventure Community</p>
          <h1 className="text-5xl font-extrabold mb-5 leading-tight">Find Your Trailbuds</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            Trailbuds is a social space built for Australian adventurers — hikers, mountain bikers,
            trail runners, and adventure racers who want to explore more, together. Find a group,
            join a ride, post your next adventure, and make friends on the trail.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {session ? (
              <Link to="/feed" className="bg-white text-trail-green font-bold px-8 py-3 rounded-xl hover:bg-trail-lime transition-colors">
                Go to Feed →
              </Link>
            ) : (
              <>
                <Link to="/auth" className="bg-white text-trail-green font-bold px-8 py-3 rounded-xl hover:bg-trail-lime transition-colors">
                  Join Free
                </Link>
                <Link to="/auth" className="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white hover:text-trail-green transition-colors">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🗓️', title: 'Post Adventures', text: 'Share your next hike, ride, or race. Set the date, difficulty, and group size — let others join.' },
            { icon: '👥', title: 'Find Your Crew', text: 'Browse upcoming activities near you, filter by state and type, and RSVP with one tap.' },
            { icon: '💬', title: 'Connect on Trail', text: 'Ask about conditions, sort out carpooling, and swap gear tips in the comments before you go.' },
          ].map(f => (
            <div key={f.title} className="bg-white rounded-2xl shadow p-6 text-center">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-900 text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Warnings */}
      <div className="bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-6 py-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">⚠️ Safety in the Australian Bush</h2>
          <p className="text-gray-500 text-sm mb-8">Know before you go. The bush is extraordinary — and unforgiving. Read these before every adventure.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WARNINGS.map(w => (
              <div key={w.title} className="bg-white rounded-xl border border-amber-200 p-4 flex gap-4">
                <span className="text-3xl shrink-0">{w.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900 mb-0.5">{w.title}</p>
                  <p className="text-sm text-gray-600">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* National Parks */}
      <div className="max-w-4xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">🗺️ Australia's National Parks</h2>
        <p className="text-gray-500 text-sm mb-8">Quick links to official park information, trail maps, and current alerts — by state.</p>
        <div className="space-y-8">
          {Object.entries(PARKS).map(([state, parks]) => (
            <div key={state} className={`rounded-2xl border p-5 ${STATE_COLORS[state]}`}>
              <h3 className="font-bold text-gray-800 text-lg mb-3">{state}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {parks.map(p => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-lg px-3 py-2 text-sm font-medium text-trail-green hover:bg-trail-green hover:text-white transition-colors border border-gray-100 flex items-center gap-1"
                  >
                    <span className="truncate">{p.name}</span>
                    <span className="shrink-0 text-xs opacity-60">↗</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-trail-green text-white text-center py-12 px-6">
        <h2 className="text-2xl font-bold mb-2">Ready to find your next adventure?</h2>
        <p className="text-green-200 mb-6 text-sm">Join hundreds of Aussie adventurers already on Trailbuds.</p>
        {session ? (
          <Link to="/feed" className="bg-white text-trail-green font-bold px-8 py-3 rounded-xl hover:bg-trail-lime transition-colors">
            Go to Feed →
          </Link>
        ) : (
          <Link to="/auth" className="bg-white text-trail-green font-bold px-8 py-3 rounded-xl hover:bg-trail-lime transition-colors">
            Join Free
          </Link>
        )}
      </div>

    </div>
  )
}
