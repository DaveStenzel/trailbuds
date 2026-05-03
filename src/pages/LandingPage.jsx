import { Link } from 'react-router-dom'

const HERO_PHOTO = 'https://images.unsplash.com/photo-1614102117755-6eb30fb4ea49?auto=format&fit=crop&w=1920&q=85'

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
    { name: "D'Entrecasteaux", url: 'https://parks.dpaw.wa.gov.au/park/dentrecasteaux' },
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

const STATE_STYLES = {
  NSW: { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-600' },
  VIC: { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-600' },
  QLD: { bg: 'bg-amber-50',  border: 'border-amber-200',  badge: 'bg-amber-500' },
  WA:  { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-500' },
  SA:  { bg: 'bg-rose-50',   border: 'border-rose-200',   badge: 'bg-rose-600' },
  TAS: { bg: 'bg-teal-50',   border: 'border-teal-200',   badge: 'bg-teal-600' },
  ACT: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-600' },
  NT:  { bg: 'bg-yellow-50', border: 'border-yellow-200', badge: 'bg-yellow-500' },
}

const WARNINGS = [
  { icon: '🐍', title: 'Snakes & Spiders', text: "Australia has some of the world's most venomous species. Watch where you step. Never reach under rocks or logs." },
  { icon: '☀️', title: 'Sun & Heat', text: 'UV is extreme year-round. Wear SPF 50+, a hat, and sun-protective clothing. Start early and avoid midday in summer.' },
  { icon: '💧', title: 'Carry Enough Water', text: "Carry at least 1 litre per hour of activity. Dehydration is a leading cause of rescues. Don't rely on finding water on trail." },
  { icon: '🌊', title: 'Flash Flooding', text: 'Gorges and creek beds can flood without warning even on clear days. Check upstream weather before entering any canyon.' },
  { icon: '🔥', title: 'Bushfire', text: 'Check fire danger ratings before heading out. Know your exit routes. Have a go-early plan on high-danger days.' },
  { icon: '📡', title: 'Tell Someone Your Plan', text: "Leave a trip plan with a trusted person — where you're going, which track, and when to call for help if you're not back." },
  { icon: '🦟', title: 'Ticks & Leeches', text: 'Common in eastern coastal ranges. Check yourself after every walk. Remove ticks by freezing — never twist or squeeze.' },
  { icon: '🩺', title: 'Marine Stingers (QLD)', text: 'Box jellyfish and Irukandji are deadly. Swim only in stinger-netted areas Oct–May. Carry vinegar for first aid.' },
]

export default function LandingPage({ session }) {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Nunito, sans-serif' }}>

      {/* Hero */}
      <div
        className="relative min-h-[92vh] flex flex-col items-center justify-center text-white text-center px-6"
        style={{
          backgroundImage: `url('${HERO_PHOTO}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-trail-dark/60 via-trail-dark/50 to-trail-dark/80" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-trail-lime font-bold tracking-widest text-sm uppercase mb-4 drop-shadow">
            Australia's Adventure Community
          </p>
          <h1 className="text-6xl font-black mb-5 leading-tight drop-shadow-lg">
            Find Your<br />Trailbuds
          </h1>
          <p className="text-lg text-white/90 max-w-xl mx-auto mb-10 leading-relaxed drop-shadow">
            A social space built for Australian adventurers — hikers, mountain bikers,
            trail runners and adventure racers who want to explore more, together.
            Find a group, join a ride, post your next adventure, and make friends on the trail.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {session ? (
              <Link to="/feed" className="bg-trail-lime text-trail-dark font-extrabold px-10 py-3.5 rounded-2xl hover:bg-white transition-colors shadow-lg text-lg">
                Go to Feed →
              </Link>
            ) : (
              <>
                <Link to="/auth" className="bg-trail-lime text-trail-dark font-extrabold px-10 py-3.5 rounded-2xl hover:bg-white transition-colors shadow-lg text-lg">
                  Join Free
                </Link>
                <Link to="/auth" className="border-2 border-white/80 text-white font-bold px-10 py-3.5 rounded-2xl hover:bg-white hover:text-trail-dark transition-colors text-lg">
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm flex flex-col items-center gap-1 animate-bounce">
          <span>↓</span>
        </div>
      </div>

      {/* Feature cards */}
      <div className="bg-trail-stone">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-center text-3xl font-extrabold text-trail-dark mb-2">How it works</h2>
          <p className="text-center text-gray-500 mb-10">Three steps to your next adventure</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🗓️',
                title: 'Post Adventures',
                text: 'Share your next hike, ride, or race. Set the date, difficulty, and group size — let others join.',
                color: 'bg-emerald-600',
              },
              {
                icon: '👥',
                title: 'Find Your Crew',
                text: 'Browse upcoming activities near you, filter by state and type, and RSVP with one tap.',
                color: 'bg-trail-sky',
              },
              {
                icon: '💬',
                title: 'Connect on Trail',
                text: 'Ask about conditions, sort out carpooling, and swap gear tips in the comments before you go.',
                color: 'bg-trail-earth',
              },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow`}>
                  {f.icon}
                </div>
                <h3 className="font-extrabold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Warnings */}
      <div className="bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">⚠️</span>
            <h2 className="text-3xl font-extrabold text-gray-900">Safety in the Australian Bush</h2>
          </div>
          <p className="text-gray-500 mb-10">Know before you go. The bush is extraordinary — and unforgiving.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WARNINGS.map(w => (
              <div key={w.title} className="bg-white rounded-2xl border border-amber-100 p-5 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl shrink-0 mt-0.5">{w.icon}</span>
                <div>
                  <p className="font-bold text-gray-900 mb-1">{w.title}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* National Parks */}
      <div className="bg-trail-mist">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-extrabold text-trail-dark mb-2">🗺️ Australia's National Parks</h2>
          <p className="text-gray-500 mb-10">Official park info, trail maps, and current alerts — by state and territory.</p>
          <div className="space-y-6">
            {Object.entries(PARKS).map(([state, parks]) => {
              const s = STATE_STYLES[state]
              return (
                <div key={state} className={`rounded-2xl border ${s.bg} ${s.border} p-5 shadow-sm`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`${s.badge} text-white text-xs font-bold px-3 py-1 rounded-full`}>{state}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {parks.map(p => (
                      <a
                        key={p.name}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-xl px-3 py-2.5 text-sm font-semibold text-trail-green hover:bg-trail-green hover:text-white transition-all duration-200 border border-white/80 shadow-sm flex items-center justify-between gap-1 group"
                      >
                        <span className="truncate">{p.name}</span>
                        <span className="shrink-0 opacity-40 group-hover:opacity-100 text-xs">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div
        className="relative text-white text-center py-20 px-6"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1720428334395-3100aae2595e?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-trail-dark/70" />
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-3">Ready for your next adventure?</h2>
          <p className="text-white/70 mb-8">Join Aussie adventurers already on Trailbuds.</p>
          {session ? (
            <Link to="/feed" className="bg-trail-lime text-trail-dark font-extrabold px-10 py-3.5 rounded-2xl hover:bg-white transition-colors shadow-lg text-lg">
              Go to Feed →
            </Link>
          ) : (
            <Link to="/auth" className="bg-trail-lime text-trail-dark font-extrabold px-10 py-3.5 rounded-2xl hover:bg-white transition-colors shadow-lg text-lg">
              Join Free
            </Link>
          )}
        </div>
      </div>

    </div>
  )
}
