import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight, Github } from 'lucide-react'
import TelemetryHeader from '../ui/TelemetryHeader'
import { PERSONAL_INFO } from '../../utils/constants'

const GITHUB_CONTRIBUTIONS_URL = 'https://github-contributions-api.jogruber.de/v4/ariefmavlana?y=last'

const fetchContributions = async ({ signal }) => {
  const response = await fetch(GITHUB_CONTRIBUTIONS_URL, { signal })

  if (!response.ok) {
    throw new Error('GitHub contribution data is unavailable.')
  }

  const data = await response.json()

  if (!Array.isArray(data.contributions)) {
    throw new Error('GitHub contribution data is invalid.')
  }

  return data
}

const buildWeeks = (contributions) => contributions.reduce((weeks, contribution, index) => {
  const weekIndex = Math.floor(index / 7)
  if (!weeks[weekIndex]) weeks[weekIndex] = []
  weeks[weekIndex].push(contribution)
  return weeks
}, [])

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

const monthFormatter = new Intl.DateTimeFormat('id-ID', {
  month: 'short',
  timeZone: 'UTC',
})

const formatDate = (date) => dateFormatter.format(new Date(`${date}T00:00:00Z`))

const getMonthLabels = (weeks) => weeks.reduce((labels, week, index) => {
  const date = week[0]?.date
  if (!date) return labels

  const currentMonth = new Date(`${date}T00:00:00Z`).getUTCMonth()
  const previousDate = weeks[index - 1]?.[0]?.date
  const previousMonth = previousDate ? new Date(`${previousDate}T00:00:00Z`).getUTCMonth() : null

  if (index === 0 || currentMonth !== previousMonth) {
    labels.push({ index, label: monthFormatter.format(new Date(`${date}T00:00:00Z`)) })
  }

  return labels
}, [])

const ContributionGrid = ({ contributions, total }) => {
  const weeks = buildWeeks(contributions)
  const monthLabels = getMonthLabels(weeks)
  const gridColumns = { gridTemplateColumns: `repeat(${weeks.length}, 10px)` }

  return (
    <>
      <div className="contribution-scroll" tabIndex="0" aria-label="Grafik kontribusi GitHub selama 12 bulan terakhir">
        <div className="contribution-months" style={gridColumns} aria-hidden="true">
          {monthLabels.map(({ index, label }) => <span key={`${index}-${label}`} style={{ gridColumn: index + 1 }}>{label}</span>)}
        </div>
        <div className="contribution-grid" style={gridColumns}>
          {weeks.map((week, weekIndex) => (
            <div className="contribution-week" key={`week-${weekIndex}`}>
              {week.map((day) => (
                <span
                  className={`contribution-dot level-${Math.min(Math.max(day.level ?? 0, 0), 4)}`}
                  key={day.date}
                  aria-label={`${day.count} kontribusi pada ${formatDate(day.date)}`}
                  role="img"
                  title={`${day.count} kontribusi pada ${formatDate(day.date)}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-4 text-xs text-slate-400">
        <p><span className="font-medium text-slate-200">{total.toLocaleString('id-ID')} kontribusi</span> dalam 12 bulan terakhir</p>
        <div className="contribution-legend" aria-label="Skala intensitas kontribusi"><span>Rendah</span>{[0, 1, 2, 3, 4].map((level) => <i className={`contribution-dot level-${level}`} key={level} />)}<span>Tinggi</span></div>
      </div>
    </>
  )
}

const GitHubActivity = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['github', 'contributions', 'ariefmavlana'],
    queryFn: fetchContributions,
    staleTime: 60 * 60 * 1000,
  })

  const contributions = data?.contributions ?? []
  const total = Number(data?.total?.lastYear ?? contributions.reduce((sum, day) => sum + (day.count ?? 0), 0))

  return (
    <section id="activity" className="section-shell border-y border-white/8">
      <div className="site-container grid gap-12 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div>
          <TelemetryHeader
            eyebrow="GITHUB / JEJAK KONTRIBUSI"
            title="Ritme kerja yang dapat ditelusuri."
            subtitle="Kontribusi publik selama 12 bulan terakhir, disajikan sebagai jejak aktivitas kode—tanpa metrik yang dibesar-besarkan."
          />
          <a className="text-link mt-8" href={PERSONAL_INFO.github} target="_blank" rel="noreferrer"><Github className="size-4" /> Lihat profil GitHub <ArrowUpRight className="size-4" /></a>
        </div>
        <div className="github-activity-panel" aria-busy={isLoading}>
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-sm font-medium text-white">Kontribusi publik</p>
              <p className="mt-1 font-mono text-xs text-slate-500">@ariefmavlana / 12 bulan terakhir</p>
            </div>
            <span className="status-indicator">LIVE DATA</span>
          </div>
          {isLoading && <div className="contribution-skeleton mt-7" aria-label="Memuat kontribusi GitHub" />}
          {isError && (
            <p className="mt-7 border-t border-white/8 pt-5 text-sm leading-6 text-slate-400">Grafik belum dapat dimuat saat ini. Riwayat lengkap tetap tersedia melalui profil GitHub.</p>
          )}
          {!isLoading && !isError && <div className="mt-7"><ContributionGrid contributions={contributions} total={total} /></div>}
        </div>
      </div>
    </section>
  )
}

export default GitHubActivity
