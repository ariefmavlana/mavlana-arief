import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight, Box, CircleDot, GitBranch, GitCommitHorizontal, GitPullRequest, Github, Star } from 'lucide-react'
import { PERSONAL_INFO } from '../../utils/constants'
import TelemetryHeader from '../ui/TelemetryHeader'

const EVENT_LIMIT = 5
const GITHUB_EVENTS_URL = 'https://api.github.com/users/ariefmavlana/events/public?per_page=12'

const fetchGitHubActivity = async ({ signal }) => {
  const response = await fetch(GITHUB_EVENTS_URL, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`GitHub activity request failed with ${response.status}`)
  }

  const events = await response.json()
  return Array.isArray(events) ? events.slice(0, EVENT_LIMIT) : []
}

const relativeTime = (dateString) => {
  const difference = new Date(dateString).getTime() - Date.now()
  const ranges = [
    { unit: 'tahun', milliseconds: 31_536_000_000 },
    { unit: 'bulan', milliseconds: 2_592_000_000 },
    { unit: 'minggu', milliseconds: 604_800_000 },
    { unit: 'hari', milliseconds: 86_400_000 },
    { unit: 'jam', milliseconds: 3_600_000 },
    { unit: 'menit', milliseconds: 60_000 },
  ]

  const range = ranges.find(({ milliseconds }) => Math.abs(difference) >= milliseconds)
  if (!range) return 'baru saja'

  const value = Math.round(difference / range.milliseconds)
  return `${Math.abs(value)} ${range.unit} lalu`
}

const activityDetails = (event) => {
  const branch = event.payload?.ref?.replace('refs/heads/', '')

  switch (event.type) {
    case 'PushEvent':
      return { icon: GitCommitHorizontal, title: 'Memperbarui repositori', detail: branch ? `Push ke branch ${branch}` : 'Push perubahan kode' }
    case 'CreateEvent':
      return { icon: GitBranch, title: 'Membuat aktivitas baru', detail: event.payload?.ref_type || 'Repositori atau branch baru' }
    case 'PullRequestEvent':
      return { icon: GitPullRequest, title: 'Pull request', detail: event.payload?.action || 'Aktivitas pull request' }
    case 'IssuesEvent':
      return { icon: CircleDot, title: 'Issue', detail: event.payload?.action || 'Aktivitas issue' }
    case 'WatchEvent':
      return { icon: Star, title: 'Menandai repositori', detail: 'Star pada repositori open source' }
    default:
      return { icon: Box, title: 'Aktivitas GitHub', detail: event.type.replace('Event', '') }
  }
}

const GitHubActivity = () => {
  const { data: events = [], isPending, isError } = useQuery({
    queryKey: ['github', 'public-activity', 'ariefmavlana'],
    queryFn: fetchGitHubActivity,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <section id="activity" className="section-shell border-y border-white/10">
      <div className="site-container grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <TelemetryHeader eyebrow="GITHUB / AKTIVITAS PUBLIK" title="Tetap dekat dengan prosesnya." subtitle="Event terbaru dari GitHub ditampilkan apa adanya, agar karya tidak berhenti di tampilan portofolio." />
          <a className="text-link mt-8" href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github className="size-4" /> Buka profil GitHub <ArrowUpRight className="size-4" /></a>
        </div>

        <div className="github-activity-panel" aria-busy={isPending}>
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Github className="size-5 text-sky-200" />
              <div><p className="text-sm font-medium text-white">@ariefmavlana</p><p className="mt-0.5 text-xs text-slate-500">Event publik terbaru</p></div>
            </div>
            <span className="text-xs text-slate-500">via GitHub API</span>
          </div>

          {isPending && <div className="space-y-3 py-5" aria-label="Memuat aktivitas GitHub">{[1, 2, 3].map((item) => <div key={item} className="h-16 animate-pulse rounded-lg bg-white/5" />)}</div>}

          {isError && <div className="py-7"><p className="text-sm leading-7 text-slate-400">Aktivitas GitHub sedang tidak tersedia. Profil dan seluruh repositori tetap dapat dilihat melalui tautan di atas.</p></div>}

          {!isPending && !isError && events.length === 0 && <div className="py-7"><p className="text-sm leading-7 text-slate-400">Belum ada event publik terbaru untuk ditampilkan.</p></div>}

          {!isPending && !isError && events.length > 0 && <ul className="divide-y divide-white/10">
            {events.map((event) => {
              const activity = activityDetails(event)
              const Icon = activity.icon
              const repository = event.repo.name.replace('ariefmavlana/', '')

              return <li key={event.id}>
                <a className="github-activity-row" href={`https://github.com/${event.repo.name}`} target="_blank" rel="noreferrer">
                  <span className="github-activity-icon"><Icon className="size-4" /></span>
                  <span className="min-w-0 grow"><span className="block text-sm font-medium text-slate-100">{activity.title}</span><span className="mt-1 block truncate text-sm text-slate-400">{repository} <span className="text-slate-600">/</span> {activity.detail}</span></span>
                  <time className="shrink-0 text-xs text-slate-500" dateTime={event.created_at} title={new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(event.created_at))}>{relativeTime(event.created_at)}</time>
                  <ArrowUpRight className="github-activity-arrow size-4" />
                </a>
              </li>
            })}
          </ul>}
        </div>
      </div>
    </section>
  )
}

export default GitHubActivity
